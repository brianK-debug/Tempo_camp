import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function checkAuth(request: Request) {
  const adminAuth = request.headers.get('cookie')?.includes('admin-auth=authenticated')
  return adminAuth
}

export async function GET(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') ?? undefined
    const cursor = searchParams.get('cursor') ?? undefined

    const pageSize = 50
    const where = status && status !== 'all' ? { status } : undefined

    const bookings = await prisma.booking.findMany({
      where,
      take: pageSize,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        confirmationCode: true,
        accommodation: true,
        rateType: true,
        ratePlan: true,
        currency: true,
        basePriceCents: true,
        totalCents: true,
        nights: true,
        guests: true,
        addOnsJson: true,
        guestName: true,
        email: true,
        phone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const total = await prisma.booking.count({ where })

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        total,
        hasMore: bookings.length === pageSize,
        nextCursor: bookings.at(-2)?.id ?? null,
      },
    })
  } catch (error) {
    console.error('Fetch bookings error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      accommodation,
      rateType,
      ratePlan,
      basePrice,
      currency,
      selectedNights,
      numGuests,
      selectedAddOns,
      addOnTotal,
      grandTotal,
      guestName,
      email,
      phone,
      specialRequests,
    } = body

    const toCents = (n: number) => Math.round(Number(n) * 100)
    const nights = typeof selectedNights === 'string' ? parseInt(selectedNights.split('-')[0]) || 2 : Number(selectedNights) || 2
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2)

    const booking = await prisma.booking.create({
      data: {
        id,
        confirmationCode: `SMB-${Date.now().toString(36).toUpperCase()}`,
        accommodation,
        rateType,
        ratePlan,
        basePriceCents: toCents(basePrice),
        currency,
        nights,
        guests: numGuests,
        addOnsJson: selectedAddOns ?? [],
        addOnTotalCents: toCents(addOnTotal),
        totalCents: toCents(grandTotal),
        guestName,
        email,
        phone,
        specialRequests,
        source: 'web',
      },
    })

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error) {
    console.error('Booking save error:', error)
    return NextResponse.json({ success: false, error: 'Failed to save booking' }, { status: 500 })
  }
}
