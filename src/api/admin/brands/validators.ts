import { z } from "zod";

export const PostAdminCreateBrand = z.object({
  name: z.string(),
  description: z.string().optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  icon: z.string().optional(),
  handle: z.string().optional(),
  status: z.enum(["draft", "proposed", "published", "rejected"]).optional(),
});


export const PutAdminUpdateBrand = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  handle: z.string().optional(),
  status: z.enum(["draft", "proposed", "published", "rejected"]).optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});