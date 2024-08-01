'use client'
import React, { createContext, useState, useContext, ReactNode } from 'react'

export type TableContextProps = {
  selectedRows: string[]
  toggleRowSelection: (rowId: string) => void
  toggleSelectAll: (isChecked: boolean, rowIds: string[]) => void
  clearSelectedRows: () => void
}

const initialState: TableContextProps = {
  selectedRows: [],
  toggleRowSelection: () => {},
  toggleSelectAll: () => {},
  clearSelectedRows: () => {},
}

const TableContext = createContext<TableContextProps>(initialState)

export const TableProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>(
    initialState.selectedRows,
  )

  const toggleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId],
    )
  }

  const toggleSelectAll = (isChecked: boolean, rowIds: string[]) => {
    setSelectedRows(isChecked ? rowIds : [])
  }

  const clearSelectedRows = () => {
    setSelectedRows([])
  }

  return (
    <TableContext.Provider
      value={{
        selectedRows,
        toggleRowSelection,
        toggleSelectAll,
        clearSelectedRows,
      }}
    >
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = (): TableContextProps => {
  const context = useContext(TableContext)

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider')
  }

  return context
}
