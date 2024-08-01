import Card from '@/components/Card'
import { getStudents } from '@/actions/students'
import TableStudents from '@/components/Page/TableStudents'
import DeleteBtn from '@/components/Table/DeleteBtn'
import AddStudent from '@/components/Table/AddStudent'

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    page?: string
  }
}) {
  const currentPage = Number(searchParams?.page) || 1
  const students = await getStudents({ page: currentPage })

  return (
    <main className={'main'}>
      <Card>
        <div className={'card-header'}>
          <h1>
            Manage <span className="font-normal">Students</span>
          </h1>
          <div className={'btn-cn'}>
            <DeleteBtn />
            <AddStudent />
          </div>
        </div>
        <div className={'card-content'}>
          <TableStudents data={students.data} currentPage={currentPage} />
        </div>
      </Card>
    </main>
  )
}
