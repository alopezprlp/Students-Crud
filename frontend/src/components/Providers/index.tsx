'use client'

import { ReactNode } from 'react'
import { TableProvider } from '@/context/TableContext'
import { Toaster } from 'sonner'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <TableProvider>
      <Toaster richColors />
      {children}
    </TableProvider>
  )
}

export default Provider
