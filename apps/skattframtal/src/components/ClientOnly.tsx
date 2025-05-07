import { useEffect, useState } from 'react'
import type { ReactNode, FC } from 'react'

const ClientOnly: FC<{ children: ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) return null
  return <>{children}</>
}

export default ClientOnly
