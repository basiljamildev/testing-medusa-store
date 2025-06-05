import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import {  PostAdminCreateExtProductCategories } from "./validators";
import { createExtProductCategoriesWorkflow } from "../../../workflows/extend-product-categories/create-ext-product-categories";
import { z } from "zod";

type PostAdminCreateExtProductCategoriesType = z.infer<typeof PostAdminCreateExtProductCategories>;

export const POST = async (
  req: MedusaRequest<PostAdminCreateExtProductCategoriesType>,
  res: MedusaResponse
) => {

  console.log("req body", req.body)

  console.log("req.validatedBody", req.validatedBody);

  const { result } = await createExtProductCategoriesWorkflow(req.scope).run({
    input: req.validatedBody,
  });

  console.log("result", result);

  res.json({ extProductCategories: result });
};

// export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
//   const query = req.scope.resolve("query");

//   const { data: brands, metadata: { count, take, skip } = {} } =
//     await query.graph({
//       entity: "brand",
//       ...req.queryConfig,
//     });

//   res.json({
//     brands,
//     count,
//     limit: take,
//     offset: skip,
//   });
// };


