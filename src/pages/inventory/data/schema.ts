import { category } from '@/pages/category/data/category'
import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const inventorySchema = z.object({
  id: z.number(),
  no_pr: z.string(),
  code: z.string(),
  name: z.string(),
  category: z.string(),
  date: z.string(),
  price: z.string(),
  location: z.string(),
  department: z.string(),
  condition: z.string(),
})

export type Inventory = z.infer<typeof inventorySchema>
