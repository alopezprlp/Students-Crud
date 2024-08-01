/* eslint-disable no-console */
'use server'

import { BASE_API_URL, LIMIT_PER_PAGE } from '@/constants'
import { Student, StudentsResponse } from '@/types'

export async function getStudents({ page }: { page: number }) {
  try {
    const res = await fetch(
      `${BASE_API_URL}/students?page=${page}&limit=${LIMIT_PER_PAGE}`,
      {
        cache: 'no-store',
      },
    )
    const data = await res.json()

    if (res.status === 401) {
      return {
        success: false,
        status: 401,
        message: data.error.message,
        data: null,
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message: data.error.message,
        status: res.status,
        data: null,
      }
    }
    return {
      data: data as StudentsResponse,
      success: true,
      message: 'ok',
      status: res.status,
    }
  } catch (e: any) {
    console.error(e)
    return {
      success: false,
      status: 401,
      message: JSON.stringify(e),
      data: null,
    }
  }
}

export async function saveStudents(form: Student) {
  try {
    const res = await fetch(
      `${BASE_API_URL}/students`,

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        cache: 'no-store',
      },
    )
    const data = await res.json()

    if (res.status === 401) {
      return {
        success: false,
        status: 401,
        message: data.error.message,
        data: null,
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message: data.error.message,
        status: res.status,
        data: null,
      }
    }
    return {
      data,
      success: true,
      message: 'ok',
      status: res.status,
    }
  } catch (e: any) {
    console.error(e)
    return {
      success: false,
      status: 401,
      message: JSON.stringify(e),
      data: null,
    }
  }
}

export async function deleteStudents({ ids }: { ids: string[] }) {
  try {
    const res = await fetch(
      `${BASE_API_URL}/students`,

      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ids),
        cache: 'no-store',
      },
    )
    const data = await res.json()

    if (res.status === 401) {
      return {
        success: false,
        status: 401,
        message: data.error.message,
        data: null,
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message: data.error.message,
        status: res.status,
        data: null,
      }
    }
    return {
      data,
      success: true,
      message: 'ok',
      status: res.status,
    }
  } catch (e: any) {
    console.error(e)
    return {
      success: false,
      status: 401,
      message: JSON.stringify(e),
      data: null,
    }
  }
}

export async function updateStudents({
  id,
  form,
}: {
  id: string
  form: Student
}) {
  try {
    console.log(id, form)
    const res = await fetch(
      `${BASE_API_URL}/students/${id}`,

      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
        cache: 'no-store',
      },
    )
    const data = await res.json()

    if (res.status === 401) {
      return {
        success: false,
        status: 401,
        message: data.error.message,
        data: null,
      }
    }

    if (!res.ok) {
      return {
        success: false,
        message: data.error.message,
        status: res.status,
        data: null,
      }
    }
    return {
      data,
      success: true,
      message: 'ok',
      status: res.status,
    }
  } catch (e: any) {
    console.error(e)
    return {
      success: false,
      status: 401,
      message: JSON.stringify(e),
      data: null,
    }
  }
}
