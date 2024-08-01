'use client'
import { useState } from 'react'
import { useTableContext } from '@/context/TableContext'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Table'
import Pagination from '@/components/Pagination'
import { Student, StudentsResponse } from '@/types'
import { LIMIT_PER_PAGE } from '@/constants'
import TableActions from '@/components/Table/actions'
import Modal from '@/components/Modal'
import DeleteForm from '@/components/Table/actions/DeleteForm'
import { AddStudentForm } from '@/components/Table/form'

interface IProps {
  data: StudentsResponse | null
  currentPage: number
}

export default function TableStudents({
  // @ts-ignore
  data: { data: elements, pagination },
  currentPage,
}: IProps) {
  const { selectedRows, toggleRowSelection, toggleSelectAll } =
    useTableContext()
  const allRowIds = elements.map((el: { _id: any }) => el._id)
  const allSelected = selectedRows.length === allRowIds.length
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  return (
    <>
      <Modal
        show={showDeleteModal}
        title={'Delete Student'}
        setShow={setShowDeleteModal}
      >
        <DeleteForm
          onClose={() => setShowDeleteModal(false)}
          id={selectedStudent?._id ?? ''}
        />
      </Modal>
      <Modal
        show={showEditModal}
        title={'Edit Student'}
        setShow={setShowEditModal}
      >
        <AddStudentForm
          onClose={() => setShowEditModal(false)}
          externalData={selectedStudent}
        />
      </Modal>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input
                className={'checkbox'}
                type="checkbox"
                checked={allSelected}
                onChange={(e) => toggleSelectAll(e.target.checked, allRowIds)}
              />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Last name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {elements?.map((student: Student) => (
            <TableRow key={student._id}>
              <TableCell>
                <input
                  className={'checkbox'}
                  type="checkbox"
                  checked={selectedRows.includes(student?._id ?? '')}
                  onChange={() => toggleRowSelection(student?._id ?? '')}
                />
              </TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.last_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>
                <TableActions
                  onOpenEdit={() => setShowEditModal(true)}
                  student={student}
                  setStudent={setSelectedStudent}
                  onOpen={() => setShowDeleteModal(true)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {elements?.length === 0 ? (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '5rem',
          }}
        >
          <p>No results</p>
        </div>
      ) : (
        <div className="table-bottom">
          <div className="row-quantity">
            Showing <strong>{elements.length}</strong> out of{' '}
            <strong>{pagination.totalElements}</strong> entries
          </div>
          <Pagination
            page={currentPage}
            maxPage={Math.ceil(
              pagination?.totalElements
                ? pagination?.totalElements / LIMIT_PER_PAGE
                : 1,
            )}
            hasNext={!!pagination?.hasNextPage}
            hasPrev={
              pagination?.previousPage ? pagination?.previousPage >= 1 : false
            }
          />
        </div>
      )}
    </>
  )
}
