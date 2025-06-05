import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import productBrand from "../../../../../links/product-brand";
import { updateBrandProductsWorkflow } from "../../../../../workflows/brand/products/update-brand-products";

interface AddBrandProductsBody {
  add: any[]; // Replace 'any' with the actual type if you know it
  remove: any[];
}

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params;

  const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;

  const offset = req.query.offset
    ? parseInt(req.query.offset as string, 10)
    : 0;

  let orderField = "created_at";
  let orderDirection: "ASC" | "DESC" = "DESC";

  if (req.query.order) {
    const order = req.query.order as string;
    orderDirection = order.startsWith("-") ? "DESC" : "ASC";
    orderField = order.replace(/^-/, "") || "created_at"; // fallback if nothing after "-"
  }

  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  // Fetch all product-brand links for the given brand_id
  const { data, metadata: { count, take, skip } = {} } = await query.graph({
    entity: productBrand.entryPoint,
    fields: [
      "product.id",
      "product.title",
      "product.status",
      "product.handle",
      "product.thumbnail",
      "product.brand.id",
      "product.brand.name",
      "product.variants.id",
      "product.collection.id",
      "product.collection.title",
      "product.sales_channels.id",
      "product.sales_channels.name",
    ],
    filters: { brand_id: [id] },
    pagination: {
      order: { [orderField]: orderDirection },
      skip: offset,
      take: limit,
    },
  });

  // Extract products from the join results
  const products = data.map((entry: any) => entry.product);

  res.json({
    products,
    count,
    limit: take,
    offset: skip,
  });
};

export const PUT = async (
  req: MedusaRequest<AddBrandProductsBody>,
  res: MedusaResponse
) => {
  const { id: brand_id } = req.params;

  const add_product_ids = req.body.add;
  const remove_product_ids = req.body.remove;

  const { result } = await updateBrandProductsWorkflow(req.scope).run({
    input: { brand_id, add_product_ids, remove_product_ids },
  });

  res.json({ brand: result });
};
