import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const attributeSchema = z.object({
  id: z.number(),
  atribut: z.string()
})

export type Attribute = z.infer<typeof attributeSchema>
