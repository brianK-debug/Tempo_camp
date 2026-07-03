import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createMailer } from '@/lib/mailer'

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
        specialRequests: true,
        checkIn: true,
        checkOut: true,
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
      checkIn,
      checkOut,
    } = body

    const toCents = (n: number) => Math.round(Number(n) * 100)
    const nights = typeof selectedNights === 'string' ? parseInt(selectedNights.split('-')[0]) || 2 : Number(selectedNights) || 2
    const nightsFromDates = checkIn && checkOut ? Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))) : null
    const finalNights = nightsFromDates ?? nights
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
        nights: finalNights,
        guests: numGuests,
        addOnsJson: selectedAddOns ?? [],
        addOnTotalCents: toCents(addOnTotal),
        totalCents: toCents(grandTotal),
        guestName,
        email,
        phone,
        specialRequests,
        checkIn: checkIn ? new Date(checkIn) : undefined,
        checkOut: checkOut ? new Date(checkOut) : undefined,
        source: 'web',
      },
    })

    if (email) {
      const transporter = createMailer()
      const checkInDate = booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'
      const checkOutDate = booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: email,
          subject: 'Booking Received - Awaiting Confirmation',
          text: `Dear ${guestName || 'Guest'},

Thank you for booking with Samburu Tempo Camp. We have received your booking request.

Stay Details:
- Accommodation: ${accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Guests: ${numGuests}
- Total: ${currency} ${(grandTotal).toLocaleString()}

Our team will review your booking and send you a confirmation email shortly.

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${guestName || 'Guest'},</p>
<p>Thank you for booking with <strong>Samburu Tempo Camp</strong>. We have received your booking request.</p>
<h3>Stay Details</h3>
<ul>
  <li><strong>Accommodation:</strong> ${accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Guests:</strong> ${numGuests}</li>
  <li><strong>Total:</strong> ${currency} ${(grandTotal).toLocaleString()}</li>
</ul>
<p>Our team will review your booking and send you a confirmation email shortly.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        })
      } catch (mailErr) {
        console.error('Failed to send booking confirmation email:', mailErr)
      }
    }

    return NextResponse.json({ success: true, booking }, { status: 201 })
  } catch (error) {
    console.error('Booking save error:', error)
    return NextResponse.json({ success: false, error: 'Failed to save booking' }, { status: 500 })
  }
}
