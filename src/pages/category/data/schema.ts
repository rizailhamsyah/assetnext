import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const kompilatorSchema = z.object({
  id: z.number(),
  cc_kompilator: z.string(),
  kompilator: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export const masaManfaatSchema = z.object({
  id: z.number(),
  golongan: z.string(),
  masa_manfaat: z.number(),
  metode_penyusutan: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export const kategoriAtributSchema = z.object({
  id: z.number(),
  atribut_id: z.number(),
  kategori_id: z.number(),
  atribut: z.string(),
  value: z.string(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export const categorySchema = z.object({
  id: z.number(),
  kompilator_id: z.number(),
  masa_manfaat_id: z.number(),
  id_kategori: z.string(),
  kategori: z.string(),
  kelompok_asset: z.string(),
  kategoriAtribut: z.array(kategoriAtributSchema).optional(),
  kompilator: kompilatorSchema.optional(),
  masaManfaat: masaManfaatSchema.optional(),
})

export type Category = z.infer<typeof categorySchema>
