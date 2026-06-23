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

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { status } = await request.json()
    if (!status) {
      return NextResponse.json({ success: false, error: 'Missing status' }, { status: 400 })
    }
    const validStatuses = ['new', 'confirmed', 'completed', 'rejected', 'cancelled']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 })
    }
    const { id } = await params
    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    })
    return NextResponse.json({ success: true, booking })
  } catch (error) {
    console.error('Update booking error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update booking' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.booking.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete booking error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete booking' }, { status: 500 })
  }
}
