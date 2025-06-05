import { createProductsWorkflow } from "@medusajs/medusa/core-flows";
import { StepResponse } from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import { BRAND_MODULE } from "../../modules/brand";

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {

    
    if (!additional_data?.brand_id) {
      return new StepResponse([], []);
    }


    const link = container.resolve("link");
    const logger = container.resolve("logger");

    const links: LinkDefinition[] = [];

    for (const product of products) {
      links.push({
        [Modules.PRODUCT]: {
          product_id: product.id,
        },
        [BRAND_MODULE]: {
          brand_id: additional_data.brand_id,
        },
      });
    }

    await link.create(links);

    logger.info("Linked brand to products");

    return new StepResponse(links, links);
  }
);
