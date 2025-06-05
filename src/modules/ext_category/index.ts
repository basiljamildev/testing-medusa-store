import { Module } from "@medusajs/framework/utils";
import ExtCategoryModuleService from "./service";

export const EXT_CATEGORY_MODULE = "ext_category";

export const linkable = {
  extCategory: {
    type: "ext_category",
    primaryKey: "id",
  },
};

export default Module(EXT_CATEGORY_MODULE, {
  service: ExtCategoryModuleService,
});