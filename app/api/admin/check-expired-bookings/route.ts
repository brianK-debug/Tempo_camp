import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createMailer } from '@/lib/mailer'

function checkAuth(request: Request) {
  const adminAuth = request.headers.get('cookie')?.includes('admin-auth=authenticated')
  return adminAuth
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const expiredBookings = await prisma.booking.findMany({
      where: {
        checkOut: { lt: now },
        status: { not: 'completed' },
      },
      select: {
        id: true,
        guestName: true,
        email: true,
        checkIn: true,
        checkOut: true,
        accommodation: true,
      },
    })

    if (expiredBookings.length === 0) {
      return NextResponse.json({ success: true, message: 'No expired bookings found', updated: 0 })
    }

    const transporter = createMailer()
    const updated: string[] = []
    const emailErrors: string[] = []

    for (const booking of expiredBookings) {
      await prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'completed' },
      })
      updated.push(booking.id)

      if (!booking.email) {
        console.warn('Skipping thank-you email for booking', booking.id, '- no guest email provided')
        continue
      }

      const checkInDate = booking.checkIn ? new Date(booking.checkIn).toLocaleDateString() : 'N/A'
      const checkOutDate = booking.checkOut ? new Date(booking.checkOut).toLocaleDateString() : 'N/A'

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: booking.email,
          subject: 'Thank you for staying with us!',
          text: `Dear ${booking.guestName || 'Guest'},
            
Thank you for choosing Samburu Tempo Camp. We hope you had an unforgettable experience.

Stay details:
- Accommodation: ${booking.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}

We look forward to welcoming you back soon!

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${booking.guestName || 'Guest'},</p>
<p>Thank you for choosing <strong>Samburu Tempo Camp</strong>. We hope you had an unforgettable experience.</p>
<h3>Stay Details</h3>
<ul>
  <li><strong>Accommodation:</strong> ${booking.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
</ul>
<p>We look forward to welcoming you back soon!</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        })
      } catch (mailErr) {
        console.error('Failed to send thank-you email for booking', booking.id, mailErr)
        emailErrors.push(booking.id)
      }
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${updated.length} booking(s) to completed`,
      updated,
      emailErrors,
    })
  } catch (error) {
    console.error('Check expired bookings error:', error)
    return NextResponse.json({ success: false, error: 'Failed to process expired bookings' }, { status: 500 })
  }
}
