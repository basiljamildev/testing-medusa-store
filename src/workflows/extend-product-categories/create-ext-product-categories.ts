import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { EXT_CATEGORY_MODULE } from "../../modules/ext_category";
import ExtCategoryModuleService from "../../modules/ext_category/service";
import { Modules } from "@medusajs/framework/utils";
import { LinkDefinition } from "@medusajs/framework/types";
import ProductModule from "@medusajs/medusa/product";

export type CreateExtProductCategoriesInput = {
  icon?: string;
  meta_title?: string;
  meta_description?: string;
  product_category_id: string;
};

export const createExtProductCategoriesStep = createStep(
  "create-ext-product-categories-step",
  async (input: CreateExtProductCategoriesInput, { container }) => {
    const { product_category_id, ...rest } = input;

    console.log("product module", ProductModule);

    const extCategoryModuleService: ExtCategoryModuleService =
      container.resolve(EXT_CATEGORY_MODULE);

    const extCategory = await extCategoryModuleService.createExtCategories(rest);

    // Link ext_category with product_category
    // const link = container.resolve("link");

    // const linkDef: LinkDefinition = {
    //   "product_category": {
    //     product_category_id,
    //   },
    //   [EXT_CATEGORY_MODULE]: {
    //     ext_category_id: extCategory.id,
    //   },
    // };

    // await link.create([linkDef]);

    return new StepResponse(extCategory, extCategory.id);
  },

  async (id: string, { container }) => {
    const extCategoryModuleService: ExtCategoryModuleService =
      container.resolve(EXT_CATEGORY_MODULE);

    await extCategoryModuleService.deleteExtCategories(id);
  }
);

export const createExtProductCategoriesWorkflow = createWorkflow(
  "create-ext-product-categories",
  (input: CreateExtProductCategoriesInput) => {
    const extCategory = createExtProductCategoriesStep(input);

    return new WorkflowResponse(extCategory);
  }
);
