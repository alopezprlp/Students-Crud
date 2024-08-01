'use client'

import { Button } from '@/components/Button'
import { useState } from 'react'
import { AddStudentForm } from '@/components/Table/form'
import { PlusCircle } from '@phosphor-icons/react'
import Modal from '@/components/Modal'
import { DeviceNames, useResponsive } from '@/hooks/useDevice'

const AddStudent = () => {
  const [show, setShow] = useState(false)
  const { name } = useResponsive()
  return (
    <>
      <Button onClick={() => setShow(true)} className={'btn-green'}>
        <PlusCircle size={24} color="#ffffff" weight="fill" />
        {name !== DeviceNames.MOBILE ? 'Add New Student' : null}
      </Button>
      <Modal show={show} title={'Add Student'} setShow={setShow}>
        <AddStudentForm onClose={() => setShow(false)} />
      </Modal>
    </>
  )
}

export default AddStudent
