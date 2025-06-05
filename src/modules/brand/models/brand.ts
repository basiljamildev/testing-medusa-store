import { model } from "@medusajs/framework/utils";

export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
  status: model.enum(["draft", "proposed", "published", "rejected"]).default("draft"),
  icon: model.text(),
  handle: model.text(),
  description: model.text(),
  meta_title: model.text(),
  meta_description: model.text(),
});
