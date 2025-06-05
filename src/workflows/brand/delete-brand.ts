import {
  createStep,
  createWorkflow,
  StepResponse,
} from "@medusajs/framework/workflows-sdk";
import { BRAND_MODULE } from "../../modules/brand";
import BrandModuleService from "../../modules/brand/service";

export type DeleteBrandStepInput = {
  id: string;
};

export const deleteBrandStep = createStep(
  "delete-brand-step",
  async (input: DeleteBrandStepInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(BRAND_MODULE);
    await brandModuleService.deleteBrands(input.id);
    return new StepResponse(null, input.id);
  }
);

type DeleteBrandWorkflowInput = {
  id: string;
};

export const deleteBrandWorkflow = createWorkflow(
  "delete-brand",
  (input: DeleteBrandWorkflowInput) => {
    deleteBrandStep(input);
  }
);


