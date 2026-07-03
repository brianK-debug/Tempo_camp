import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        message: true,
        color: true,
      },
    })
    return NextResponse.json({ success: true, notices })
  } catch (error) {
    console.error('Fetch public notices error:', error)
    return NextResponse.json({ success: true, notices: [] })
  }
}
