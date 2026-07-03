import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function checkAuth(request: Request) {
  const adminAuth = request.headers.get('cookie')?.includes('admin-auth=authenticated')
  return adminAuth
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()
    const { active, message, color } = body

    const data: Record<string, unknown> = {}
    if (typeof active === 'boolean') data.active = active
    if (typeof message === 'string') data.message = message.trim()
    if (typeof color === 'string') data.color = color

    const notice = await prisma.notice.update({
      where: { id },
      data,
      select: {
        id: true,
        message: true,
        color: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return NextResponse.json({ success: true, notice })
  } catch (error) {
    console.error('Update notice error:', error)
    return NextResponse.json({ success: false, error: 'Failed to update notice' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.notice.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete notice error:', error)
    return NextResponse.json({ success: false, error: 'Failed to delete notice' }, { status: 500 })
  }
}
