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
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        message: true,
        color: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    return NextResponse.json({ success: true, notices })
  } catch (error) {
    console.error('Fetch notices error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch notices' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { message, color } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 })
    }

    const notice = await prisma.notice.create({
      data: {
        message: message.trim(),
        color: color || '#000000',
      },
      select: {
        id: true,
        message: true,
        color: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ success: true, notice }, { status: 201 })
  } catch (error) {
    console.error('Create notice error:', error)
    return NextResponse.json({ success: false, error: 'Failed to create notice' }, { status: 500 })
  }
}
