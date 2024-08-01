'use client'
import { Button } from '@/components/Button'
import { deleteStudents } from '@/actions/students'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DeleteForm = ({ id, onClose }: { id: string; onClose: () => void }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const deleteItem = async () => {
    setIsLoading(true)
    const res = await deleteStudents({ ids: [id] }).finally(() => {
      setIsLoading(false)
    })

    if (!res.success) {
      return toast.error(
        Array.isArray(res.message) ? res.message.join(', ') : res.message,
      )
    }

    if (res.success) {
      toast.success('Successfully removed')
      router.refresh()
      onClose()
      return
    }
    toast.error('Error')
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <p>Are you sure you want to delete this student?</p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          gap: '0.5rem',
        }}
      >
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={deleteItem}
          className={'btn-red'}
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default DeleteForm
