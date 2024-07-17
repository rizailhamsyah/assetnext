import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const locationSchema = z.object({
  id: z.number(),
  id_lokasi: z.string(),
  lokasi: z.string(),
  area: z.string(),
})

export type Location = z.infer<typeof locationSchema>
