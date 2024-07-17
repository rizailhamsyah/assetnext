import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const mutationSchema = z.object({
  id: z.number(),
  date: z.string(),
  location_start: z.string(),
  department_start: z.string(),
  location_end: z.string(),
  department_end: z.string(),
  employee: z.string(),
})

export type Mutation = z.infer<typeof mutationSchema>
