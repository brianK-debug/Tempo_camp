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
    const existing = await prisma.booking.findUnique({
      where: { id },
      select: { id: true, status: true, guestName: true, email: true, accommodation: true, checkIn: true, checkOut: true },
    })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      select: { id: true, status: true },
    })

    let emailSent = false
    let emailError: string | null = null
    const shouldEmail = existing.email && existing.status !== status
    if (shouldEmail) {
      const transporter = createMailer()
      const checkInDate = existing.checkIn ? new Date(existing.checkIn).toLocaleDateString() : 'N/A'
      const checkOutDate = existing.checkOut ? new Date(existing.checkOut).toLocaleDateString() : 'N/A'
      const statusLabel = status.charAt(0).toUpperCase() + status.slice(1)

      const statusMessages: Record<string, { subject: string; body: string; html: string }> = {
        confirmed: {
          subject: 'Booking Confirmed - Samburu Tempo Camp',
          body: `Dear ${existing.guestName || 'Guest'},

Great news! Your booking dates are available and we are pleased to confirm your reservation with Samburu Tempo Camp. We look forward to welcoming you!

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Status: Confirmed

If you have any questions, feel free to reach out.

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>Great news! Your booking dates are <strong>available</strong> and we are pleased to confirm your reservation with <strong>Samburu Tempo Camp</strong>. We look forward to welcoming you!</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Status:</strong> Confirmed</li>
</ul>
<p>If you have any questions, feel free to reach out.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        },
        rejected: {
          subject: 'Booking Update - Samburu Tempo Camp',
          body: `Dear ${existing.guestName || 'Guest'},

We regret to inform you that your booking request with Samburu Tempo Camp has been rejected.

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Status: Rejected

We apologize for any inconvenience. We hope to welcome you another time.

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>We regret to inform you that your booking request with <strong>Samburu Tempo Camp</strong> has been rejected.</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Status:</strong> Rejected</li>
</ul>
<p>We apologize for any inconvenience. We hope to welcome you another time.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        },
        cancelled: {
          subject: 'Booking Cancelled - Samburu Tempo Camp',
          body: `Dear ${existing.guestName || 'Guest'},

Your booking with Samburu Tempo Camp has been cancelled.

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Status: Cancelled

If this was a mistake or you would like to rebook, please contact us.

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>Your booking with <strong>Samburu Tempo Camp</strong> has been <strong>cancelled</strong>.</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Status:</strong> Cancelled</li>
</ul>
<p>If this was a mistake or you would like to rebook, please contact us.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        },
        completed: {
          subject: 'Stay Completed - Samburu Tempo Camp',
          body: `Dear ${existing.guestName || 'Guest'},

Your stay with Samburu Tempo Camp has been marked as completed. We hope you had an amazing time!

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Status: Completed

We would love to see you again soon.

Warm regards,
Samburu Tempo Camp Team`,
          html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>Your stay with <strong>Samburu Tempo Camp</strong> has been marked as <strong>completed</strong>. We hope you had an amazing time!</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Status:</strong> Completed</li>
</ul>
<p>We would love to see you again soon.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
        },
      }

      const message = statusMessages[status] || {
        subject: `Booking ${statusLabel} - Samburu Tempo Camp`,
        body: `Dear ${existing.guestName || 'Guest'},

Your booking status has been updated to ${statusLabel}.

Booking Details:
- Booking ID: ${existing.id}
- Accommodation: ${existing.accommodation}
- Check-in: ${checkInDate}
- Check-out: ${checkOutDate}
- Status: ${statusLabel}

If you have any questions, please contact us.

Warm regards,
Samburu Tempo Camp Team`,
        html: `<p>Dear ${existing.guestName || 'Guest'},</p>
<p>Your booking status has been updated to <strong>${statusLabel}</strong>.</p>
<h3>Booking Details</h3>
<ul>
  <li><strong>Booking ID:</strong> ${existing.id}</li>
  <li><strong>Accommodation:</strong> ${existing.accommodation}</li>
  <li><strong>Check-in:</strong> ${checkInDate}</li>
  <li><strong>Check-out:</strong> ${checkOutDate}</li>
  <li><strong>Status:</strong> ${statusLabel}</li>
</ul>
<p>If you have any questions, please contact us.</p>
<p>Warm regards,<br/><strong>Samburu Tempo Camp Team</strong></p>`,
      }

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
          to: existing.email,
          subject: message.subject,
          text: message.body,
          html: message.html,
        })
        emailSent = true
      } catch (mailErr) {
        console.error('Failed to send status email for booking', id, mailErr)
        emailError = mailErr instanceof Error ? mailErr.message : 'Unknown email error'
      }
    }

    return NextResponse.json({ success: true, booking, emailSent, emailError })
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