import { useEffect, useRef, useState } from 'react'

/**
 * A small pill that shows `message` for a moment each time `show` is called. It sits near the top:
 * on Android 13+ the system clipboard preview covers the bottom of the screen right after a copy.
 */
export function useAddressUiToast(message: string, duration = 1500) {
  const [visible, setVisible] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  function show() {
    clearTimeout(timer.current)
    setVisible(true)
    timer.current = setTimeout(() => setVisible(false), duration)
  }

  const toast = visible ? (
    <div
      aria-live="polite"
      className="bg-primary text-primary-foreground animate-in fade-in pointer-events-none fixed top-2 left-1/2 -translate-x-1/2 rounded-full px-4.5 py-2.5 text-sm font-semibold"
    >
      {message}
    </div>
  ) : null

  return { show, toast }
}
