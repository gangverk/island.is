import { useRef, useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'
import * as rowAnim from './TableRowAnimation.css'

interface AnimatedTableRowWrapperProps {
  animate: boolean
  children: ReactNode
  className?: string
}

const AnimatedTableRowWrapper: FC<AnimatedTableRowWrapperProps> = ({
  animate,
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  useEffect(() => {
    if (hasMounted && animate && ref.current) {
      ref.current.classList.add(rowAnim.rowEnter)
      requestAnimationFrame(() => {
        ref.current?.classList.add(rowAnim.rowEnterActive)
      })
    }
  }, [animate, hasMounted])

  return (
    <div ref={ref} className={className}>
      <div>{children}</div>
    </div>
  )
}

export default AnimatedTableRowWrapper
