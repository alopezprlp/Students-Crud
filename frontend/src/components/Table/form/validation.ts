import { z } from 'zod'

export const FormStudentSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  last_name: z.string().min(1, {
    message: 'Last name is required',
  }),
  age: z
    .string()
    .min(1, {
      message: 'Age is required',
    })
    .refine(
      (data) => {
        return +data >= 1
      },
      {
        message: 'Age should be grater than 0',
      },
    ),
  grade: z
    .string()
    .min(1, {
      message: 'Grade is required',
    })
    .refine(
      (data) => {
        return +data >= 1
      },
      {
        message: 'Grade should be grater than 0',
      },
    ),
  email: z.string().email(),
})

export type FormStudentValues = z.infer<typeof FormStudentSchema>
