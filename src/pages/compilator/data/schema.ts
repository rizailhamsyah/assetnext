import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const compilatorSchema = z.object({
  id: z.number(),
  cc_kompilator: z.string(),
  kompilator: z.string(),
})

export type Compilator = z.infer<typeof compilatorSchema>
