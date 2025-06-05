import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { deleteBrandWorkflow } from "../../../../workflows/brand/delete-brand";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import { PutAdminUpdateBrand } from "../validators";
import { z } from "zod";
import { updateBrandWorkflow } from "../../../../workflows/brand/update-brand";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;
  const query_fields = req.query.fields;

  const fields =
    typeof query_fields === "string"
      ? query_fields.split(",").map((f) => f.trim())
      : ["*"];

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  const { data } = await query.graph({
    entity: "brand",
    fields,
    filters: { id: [id] },
  });


  const brand = data?.[0] || null;

  res.json({
    brand,
  });
};

type PutAdminUpdateBrandType = z.infer<typeof PutAdminUpdateBrand>;

export const PUT = async (req: MedusaRequest<PutAdminUpdateBrandType>, res: MedusaResponse) => {
  const { id } = req.params;

  const { result } = await updateBrandWorkflow(req.scope).run({
    input: { id, ...req.validatedBody },
  });

  res.json({ brand: result });
};


export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;

  await deleteBrandWorkflow(req.scope).run({ input: { id } });

  res.json({ id });
};
