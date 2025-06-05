// src/links/product-category.ts
import { defineLink } from "@medusajs/framework/utils"
import ProductModule from "@medusajs/medusa/product"
import ExtCategoryModule from "../modules/ext_category"

export default defineLink(
  ProductModule.linkable.productCategory,       
  ExtCategoryModule.linkable.extCategory        
)
