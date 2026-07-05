import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createMailer } from '@/lib/mailer'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { bookingId } = body

    if (!bookingId || typeof bookingId !== 'string') {
      return NextResponse.json({ success: false, error: 'Booking ID is required' }, { status: 400 })
    }

    const existing = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: { id: true, status: true, guestName: true, email: true, accommodation: true, checkIn: true, checkOut: true },
    })

    if (!existing) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    const checkInDate = existing.checkIn ? new Date(existing.checkIn).toLocaleDateString() : 'N/A'
    const checkOutDate = existing.checkOut ? new Date(existing.checkOut).toLocaleDateString() : 'N/A'

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: 'cancelled' },
      select: { id: true, status: true },
    })

    let emailSent = false
    const shouldEmail = existing.email
    if (shouldEmail) {
      const transporter = createMailer()
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: existing.email,
          subject: 'Booking Cancelled - Samburu Tempo Camp',
          text: `Dear ${existing.guestName || 'Guest'},

Your booking has been cancelled successfully.

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Status: Cancelled

If you did not initiate this cancellation or would like to rebook, please contact us.

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>Your booking has been cancelled successfully.</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Status:</strong> Cancelled</li>
</ul>
<p>If you did not initiate this cancellation or would like to rebook, please contact us.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        })
        emailSent = true
      } catch (mailErr) {
        console.error('Failed to send cancellation email for booking', bookingId, mailErr)
      }
    }

    return NextResponse.json({ success: true, booking, emailSent })
  } catch (error) {
    console.error('Cancel booking error:', error)
    return NextResponse.json({ success: false, error: 'Failed to cancel booking' }, { status: 500 })
  }
}