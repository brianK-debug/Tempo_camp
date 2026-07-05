import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createMailer } from '@/lib/mailer'

function checkAuth(request: Request) {
  const adminAuth = request.headers.get('cookie')?.includes('admin-auth=authenticated')
  return adminAuth
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { paid } = await request.json()
    if (typeof paid !== 'boolean') {
      return NextResponse.json({ success: false, error: 'Invalid paid status' }, { status: 400 })
    }
    const { id } = await params
    const existing = await prisma.booking.findUnique({
      where: { id },
      select: { id: true, guestName: true, email: true, accommodation: true, checkIn: true, checkOut: true, totalCents: true, currency: true, paid: true },
    })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { paid },
      select: { id: true, paid: true },
    })

    let emailSent = false
    const shouldEmail = existing.email && !existing.paid && paid
    if (shouldEmail) {
      const transporter = createMailer()
      const checkInDate = existing.checkIn ? new Date(existing.checkIn).toLocaleDateString() : 'N/A'
      const checkOutDate = existing.checkOut ? new Date(existing.checkOut).toLocaleDateString() : 'N/A'
      const amount = existing.totalCents ? (existing.totalCents / 100).toLocaleString() : 'N/A'
      const currency = existing.currency || 'KSH'

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: existing.email,
          subject: 'Payment Received - Samburu Tempo Camp',
          text: `Dear ${existing.guestName || 'Guest'},

We have received your payment of ${currency} ${amount}. Thank you for your payment!

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Amount Paid: ${currency} ${amount}

We look forward to welcoming you. Enjoy your stay!

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>We have received your payment of <strong>${currency} ${amount}</strong>. Thank you for your payment!</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Amount Paid:</strong> ${currency} ${amount}</li>
</ul>
<p>We look forward to welcoming you. Enjoy your stay!</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        })
        emailSent = true
      } catch (mailErr) {
        console.error('Failed to send payment received email for booking', id, mailErr)
      }
    }

    return NextResponse.json({ success: true, booking, emailSent })
  } catch (error) {
    console.error('Update paid status error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update paid status' }, { status: 500 })
  }
}