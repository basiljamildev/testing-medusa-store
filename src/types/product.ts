type Collection = {
    id: string;
    title: string;
    handle: string;
    metadata: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
  };
  
  export type SalesChannel = {
    id: string;
    name: string;
    description: string;
    is_disabled: boolean;
    metadata: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
  };
  
  type Variant = {
    id: string;
  };

  type Brand = {
    id: string;
    name: string;
  };

 export type ShippingProfile = {
    id: string;
    name: string;
    description: string;
    metadata: null;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    type: string;
  };
  
 export type Product = {
    id: string;
    title: string;
    description: string;
    subtitle: string;
    brand: Brand;
    handle: string;
    discountable: boolean;
    status: string;
    thumbnail?: string;
    variants: Variant[];
    collection: Collection;
    sales_channels: SalesChannel[];
    shipping_profile: ShippingProfile;
  };