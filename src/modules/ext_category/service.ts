import { MedusaService } from "@medusajs/framework/utils";
import { ExtCategory } from "./models/ext_category";

class ExtCategoryModuleService extends MedusaService({
  ExtCategory,
}) {}

export default ExtCategoryModuleService;
