import { z } from "zod";

export const PostAdminCreateExtProductCategories = z.object({
  icon: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  product_category_id: z.string(),
});


// export const PutAdminUpdateBrand = z.object({
//   name: z.string().optional(),
//   description: z.string().optional(),
//   handle: z.string().optional(),
//   status: z.enum(["draft", "proposed", "published", "rejected"]).optional(),
//   meta_title: z.string().optional(),
//   meta_description: z.string().optional(),
// });