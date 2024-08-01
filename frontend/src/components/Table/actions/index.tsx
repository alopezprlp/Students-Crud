'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/Button'
import { PencilSimple, Trash } from '@phosphor-icons/react'
import { Student } from '@/types'
import Tooltip from '@/components/Tooltip'

const TableActions = ({
  student,
  setStudent,
  onOpen,
  onOpenEdit,
}: {
  student: Student
  setStudent: Dispatch<SetStateAction<Student | null>>
  onOpenEdit: () => void
  onOpen: () => void
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
      <Tooltip text="Edit">
        <Button
          onClick={() => {
            setStudent(student)
            onOpenEdit()
          }}
          className={'btn-ghost btn-icon'}
        >
          <PencilSimple size={24} color="#fec928" weight="fill" />
        </Button>
      </Tooltip>
      <Tooltip text={'Delete'}>
        <Button
          className={'btn-ghost btn-icon'}
          onClick={() => {
            setStudent(student)
            onOpen()
          }}
        >
          <Trash size={24} color="#d9534f" weight="fill" />
        </Button>
      </Tooltip>
    </div>
  )
}

export default TableActions
