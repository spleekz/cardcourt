import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const PortalToBody: React.FC = ({ children }) => {
  const [container] = useState(() => document.createElement('div'))

  useEffect(() => {
    document.body.appendChild(container)
    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return createPortal(children, container)
}
