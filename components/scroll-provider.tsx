'use client'

import { useEffect } from 'react'

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const initLenis = async () => {
      const Lenis = (await import('lenis')).default
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
      })

      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)

      return lenis
    }

    initLenis().catch((e) => console.error('Lenis initialization failed:', e))
  }, [])

  return <>{children}</>
}
