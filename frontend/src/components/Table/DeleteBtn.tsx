'use client'
import { Button } from '@/components/Button'
import { useTableContext } from '@/context/TableContext'
import { deleteStudents } from '@/actions/students'
import { useState } from 'react'
import { toast } from 'sonner'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { MinusCircle } from '@phosphor-icons/react'
import { DeviceNames, useResponsive } from '@/hooks/useDevice'

const DeleteBtn = () => {
  const { name } = useResponsive()
  const { selectedRows, clearSelectedRows } = useTableContext()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()
  const currentPage = Number(searchParams.get('page')) || 1

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const deleteRows = async () => {
    setIsLoading(true)
    const res = await deleteStudents({ ids: selectedRows }).finally(() => {
      setIsLoading(false)
    })

    if (!res.success) {
      return toast.error(
        Array.isArray(res.message) ? res.message.join(', ') : res.message,
      )
    }

    if (res.success) {
      toast.success('Successfully removed')
      handlePage(currentPage > 1 ? currentPage - 1 : 1)
      router.refresh()
      clearSelectedRows()
      return
    }
    toast.error('Error')
  }

  return (
    <>
      {selectedRows.length ? (
        <Button
          onClick={deleteRows}
          isLoading={isLoading}
          className={'btn-red'}
        >
          <MinusCircle size={24} color="#ffffff" weight="fill" />
          {name !== DeviceNames.MOBILE ? 'Delete' : null}
        </Button>
      ) : null}
    </>
  )
}

export default DeleteBtn
