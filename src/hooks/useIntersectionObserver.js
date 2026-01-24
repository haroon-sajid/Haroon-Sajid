import { useEffect, useRef, useState } from 'react'

/**
 * Lightweight hook for scroll-triggered animations using IntersectionObserver
 * Much more performant than framer-motion's whileInView
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true)
          if (!hasIntersected) {
            setHasIntersected(true)
            // Add animation class
            element.classList.add('animate-in')
          }
        } else {
          setIsIntersecting(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasIntersected, options])

  return [elementRef, isIntersecting, hasIntersected]
}

export default useIntersectionObserver
