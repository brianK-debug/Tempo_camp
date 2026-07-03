'use client'

import { useEffect, useState } from 'react'

type Notice = {
  id: string
  message: string
  color: string
}

export function NoticeBar() {
  const [notices, setNotices] = useState<Notice[]>([])

  useEffect(() => {
    let cancelled = false
    fetch('/api/public/notices')
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return
        if (data?.success && Array.isArray(data.notices)) {
          setNotices(data.notices)
        }
      })
      .catch(() => {
        // ignore notice fetch errors
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (!notices.length) return null

  const text = notices.map((n) => n.message).join('     ★     ')

  return (
    <div className="fixed top-0 left-0 w-full z-[60] bg-secondary text-white overflow-hidden whitespace-nowrap">
      <div className="animate-marquee inline-block py-2 text-sm font-medium">
        {text}
      </div>
    </div>
  )
}
