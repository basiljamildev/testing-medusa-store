import { model } from "@medusajs/framework/utils";

export const ExtCategory = model.define("ext_category", {
  id: model.id().primaryKey(),
  icon: model.text(),
  meta_title: model.text(),
  meta_description: model.text(),
});
