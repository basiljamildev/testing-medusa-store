import { updateProductsWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import { BRAND_MODULE } from "../../modules/brand";

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }

    console.log("updateProductStep, products", products);

    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const linksToCreate: LinkDefinition[] = [];

    for (const product of products) {
      // Remove existing brand links
      await link.delete({
        [Modules.PRODUCT]: { product_id: product.id },
        [BRAND_MODULE]: {},
      });

      // Add new brand link
      linksToCreate.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      });
    }

    // Create new links
    await link.create(linksToCreate);

    logger.info("Updated brand links for products");

    return new StepResponse(linksToCreate, linksToCreate);
  }
);
