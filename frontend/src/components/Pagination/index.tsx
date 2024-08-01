/* eslint-disable react-hooks/exhaustive-deps */
'use client'
// REACT
import React, { useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/Button'
import useDevice, { DeviceNames, Devices } from '@/hooks/useDevice'

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  page: number
  maxPage?: number
  // onPageChange: (page: number) => unknown;
  hasNext: boolean
  hasPrev: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  maxPage,
  hasNext,
  hasPrev,
  ...props
}) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', String(page))
    replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const hasNext2 = useMemo(() => {
    return (
      parseInt(`${page + 1 || 2}`) < parseInt(`${maxPage || Number.MAX_VALUE}`)
    )
  }, [page, maxPage])

  const hasPrev2 = useMemo(() => {
    return parseInt(`${page - 1 || 0}`) > 1
  }, [page, maxPage])

  const isMobile = useDevice(Devices[DeviceNames.MOBILE])
  const isTablet = useDevice(Devices[DeviceNames.TABLET])

  return (
    <div {...props}>
      <ul className="pagination">
        <li onClick={hasPrev ? () => handlePage(1) : undefined}>
          <Button
            disabled={!hasPrev}
            className={'btn-ghost'}
            onClick={
              hasNext && maxPage ? () => handlePage(page - 1) : undefined
            }
          >
            Previous
          </Button>
        </li>

        {hasPrev2 && !isMobile && !isTablet ? (
          <li>
            <Button
              className={'btn-ghost'}
              onClick={(e) => {
                if (hasPrev2) {
                  return handlePage(page - 2)
                }
              }}
            >
              {page - 2}
            </Button>
          </li>
        ) : null}
        {hasPrev && (
          <li
            onClick={(e) => {
              e.preventDefault()
              if (hasPrev) {
                handlePage(page - 1)
                return
              }
            }}
          >
            <Button className={'btn-ghost'}>
              <span>{page - 1}</span>
            </Button>
          </li>
        )}
        <li>
          <Button>{page || 1}</Button>
        </li>
        {hasNext && (
          <li
            onClick={(e) => {
              e.preventDefault()
              if (hasNext) {
                return handlePage(page + 1)
              }
            }}
          >
            <Button className={'btn-ghost'}>{page + 1}</Button>
          </li>
        )}
        {hasNext2 && !isMobile && !isTablet ? (
          <li>
            <Button
              className={'btn-ghost'}
              onClick={(e) => {
                if (hasNext2) {
                  return handlePage(page + 2)
                }
              }}
            >
              {page + 2}
            </Button>
          </li>
        ) : null}

        <Button
          disabled={!hasNext}
          onClick={hasNext && maxPage ? () => handlePage(page + 1) : undefined}
          className={'btn-ghost'}
        >
          Next
        </Button>
      </ul>
    </div>
  )
}

export default Pagination
