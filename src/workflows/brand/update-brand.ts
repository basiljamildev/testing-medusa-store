import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "../../modules/brand";
import BrandModuleService from "../../modules/brand/service";

export type UpdateBrandStepInput = {
  id: string;
  name?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  icon?: string;
  handle?: string;
  status?: "draft" | "proposed" | "published" | "rejected";
};

export const updateBrandStep = createStep(
  "update-brand-step",
  async (input: UpdateBrandStepInput, { container }) => {

    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);


    const brand = await brandModuleService.updateBrands(input);

    return new StepResponse(brand, brand.id);
  },

  async (id: string, { container }) => {
    const brandModuleService: BrandModuleService =
      container.resolve(BRAND_MODULE);

    await brandModuleService.deleteBrands(id);
  }
);

type UpdateBrandWorkflowInput = {
  id: string;
  name?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  icon?: string;
  handle?: string;
  status?: "draft" | "proposed" | "published" | "rejected";
};

export const updateBrandWorkflow = createWorkflow(
  "update-brand",
  (input: UpdateBrandWorkflowInput) => {
    const brand = updateBrandStep(input);

    return new WorkflowResponse(brand);
  }
);
