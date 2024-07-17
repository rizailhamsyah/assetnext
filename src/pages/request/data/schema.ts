import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const requestSchema = z.object({
  id: z.number(),
  id_request: z.string(),
  cc_pemir: z.string(),
  department: z.string(),
  asset: z.string(),
  qty: z.number(),
  price: z.string(),
  status: z.string(),
  year: z.string(),
})

export type Request = z.infer<typeof requestSchema>
