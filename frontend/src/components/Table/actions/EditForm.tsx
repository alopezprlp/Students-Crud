'use client'

import { useState } from 'react'
import { AddStudentForm } from '@/components/Table/form'
import Modal from '@/components/Modal'
import { Button } from '@/components/Button'
import { PencilSimple } from '@phosphor-icons/react'
import { Student } from '@/types'

const EditModal = ({ student }: { student: Student }) => {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button onClick={() => setShow(true)} className={'btn-ghost btn-icon'}>
        <PencilSimple size={24} color="#fec928" weight="fill" />
      </Button>{' '}
      <Modal show={show} title={'Add Student'} setShow={setShow}>
        <AddStudentForm onClose={() => setShow(false)} externalData={student} />
      </Modal>
    </>
  )
}

export default EditModal
