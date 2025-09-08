"use client"

import { useState, useEffect } from 'react'

type BreakpointKey = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const breakpoints: Record<BreakpointKey, number> = {
  xxs: 380,
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowSize.width < breakpoints.sm
  const isTablet = windowSize.width >= breakpoints.sm && windowSize.width < breakpoints.lg
  const isDesktop = windowSize.width >= breakpoints.lg

  const isBreakpoint = (breakpoint: BreakpointKey) => {
    return windowSize.width >= breakpoints[breakpoint]
  }

  const isBelowBreakpoint = (breakpoint: BreakpointKey) => {
    return windowSize.width < breakpoints[breakpoint]
  }

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint,
    isBelowBreakpoint,
  }
}

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    media.addListener(listener)
    return () => media.removeListener(listener)
  }, [matches, query])

  return matches
}