import {
  StepResponse,
  WorkflowResponse,
  createStep,
  createWorkflow,
} from "@medusajs/framework/workflows-sdk";
import { Modules } from "@medusajs/framework/utils";
import { BRAND_MODULE } from "../../../modules/brand";
import { LinkDefinition } from "@medusajs/framework/types";

// Input type for the workflow
export type UpdateBrandProductsInput = {
  brand_id: string;
  add_product_ids?: string[];
  remove_product_ids?: string[];
};

export const updateBrandProductsStep = createStep(
  "update-brand-products-step",
  async (input: UpdateBrandProductsInput, { container }) => {
    console.log("input", input);

    const { brand_id, add_product_ids = [], remove_product_ids = [] } = input;

    console.log("add_product_ids", add_product_ids);
    console.log("remove_product_ids", remove_product_ids);

    if (!brand_id) {
      return new StepResponse({ brand_id, add_product_ids: [] });
    }

    console.log("updateBrandProductsStep, input", input);

    const link = container.resolve("link");
    const logger = container.resolve("logger");

    // Build link definitions between products and brand
    if (add_product_ids.length > 0) {
      const addLinks: LinkDefinition[] = add_product_ids.map((product_id) => ({
        [Modules.PRODUCT]: { product_id },
        [BRAND_MODULE]: { brand_id },
      }));

      await link.create(addLinks);
      logger.info(
        `Linked products to brand ${brand_id}: ${add_product_ids.join(", ")}`
      );
    }

    if (remove_product_ids.length > 0) {
      await link.dismiss({
        [Modules.PRODUCT]: {
          product_id: remove_product_ids,
        },
        [BRAND_MODULE]: {
          brand_id,
        },
      });
      logger.info(
        `Unlinked products from brand ${brand_id}: ${remove_product_ids.join(
          ", "
        )}`
      );
    }

    return new StepResponse({ brand_id, add_product_ids });
  }
);

export const updateBrandProductsWorkflow = createWorkflow(
  "update-brand-products",
  (input: UpdateBrandProductsInput) => {
    const brandStep = updateBrandProductsStep(input);
    return new WorkflowResponse(brandStep);
  }
);
