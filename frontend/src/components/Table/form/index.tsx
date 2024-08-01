'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Forms'
import { Button } from '@/components/Button'
import {
  FormStudentSchema,
  FormStudentValues,
} from '@/components/Table/form/validation'
import { Input } from '@/components/Input'
import { saveStudents, updateStudents } from '@/actions/students'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Student } from '@/types'
import { useEffect } from 'react'

export function AddStudentForm({
  onClose,
  externalData,
}: {
  onClose: () => void
  externalData?: Student | null
}) {
  const router = useRouter()
  const form = useForm<FormStudentValues>({
    resolver: zodResolver(FormStudentSchema),
    defaultValues: {
      name: externalData?.name ?? '',
      last_name: externalData?.last_name ?? '',
      email: externalData?.email ?? '',
      age: String(externalData?.age ?? ''),
      grade: externalData?.grade ?? '',
    },
  })

  useEffect(() => {
    if (externalData) {
      form.reset({
        name: externalData?.name ?? '',
        last_name: externalData?.last_name ?? '',
        email: externalData?.email ?? '',
        age: String(externalData?.age ?? ''),
        grade: externalData?.grade ?? '',
      })
    }
  }, [externalData])

  async function onSubmit(data: FormStudentValues) {
    const res = externalData
      ? await updateStudents({
          id: externalData._id ?? '',
          form: { ...data, age: +data.age },
        })
      : await saveStudents({ ...data, age: +data.age })
    if (!res.success) {
      return toast.error(
        Array.isArray(res.message) ? res.message.join(', ') : res.message,
      )
    }

    if (res.success) {
      toast.success(`Successfully ${externalData ? 'updated' : 'added'}`)
      router.refresh()
      onClose()
      form.reset()
      return
    }
    toast.error('Error')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="form">
        <FormField
          control={form.control}
          name="name"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Stephen King"
                  {...field}
                  isValid={!errors['name']}
                />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. stephenking@lorem.com"
                  {...field}
                  isValid={!errors['last_name']}
                />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. stephenking@lorem.com"
                  {...field}
                  isValid={!errors['email']}
                />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type={'number'}
                  placeholder="e.g. 28"
                  {...field}
                  isValid={!errors['age']}
                />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />{' '}
        <FormField
          control={form.control}
          name="grade"
          render={({ field, formState: { errors } }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <FormControl>
                <Input
                  type={'number'}
                  placeholder="e.g. 5"
                  {...field}
                  isValid={!errors['grade']}
                />
                <FormMessage />
              </FormControl>
            </FormItem>
          )}
        />
        <div className={'bt-form'}>
          <Button type="button" className={'btn-ghost'} onClick={onClose}>
            Cerrar
          </Button>
          <Button type="submit" isLoading={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
