import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const benefitSchema = z.object({
  id: z.number(),
  golongan: z.string(),
  masa_manfaat: z.number(),
  metode_penyusutan: z.string()
})

export type Benefit = z.infer<typeof benefitSchema>
