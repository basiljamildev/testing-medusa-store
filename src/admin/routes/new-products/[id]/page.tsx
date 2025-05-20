import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../../lib/sdk";
import { TwoColumnLayout } from "../../../layouts/two-column";
import DetailsCard from "./product-cards/detail";
import SalesChannelCard from "./product-cards/sales-channel";
import { Product } from "../../../../types/product";
import ShippingCard from "./product-cards/shipping";

type ProductsResponse = {
  product: Product;
};

const ProductDetailsPage = () => {
  const { id }: any = useParams();

  const { data, isLoading } = useQuery<ProductsResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/products/${id}`, {
        query: {
          fields: "+brand.*,shipping_profile.*",
        },
      }),
    queryKey: [["products", id]],
  });

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <TwoColumnLayout
      firstCol={
        <>
          <DetailsCard product={data?.product} />
          {/* <DetailsCard product={data?.product} /> */}
        </>
      }
      secondCol={
        <>
        <SalesChannelCard salesChannels={data?.product.sales_channels} />
        <ShippingCard shippingProfile={data?.product.shipping_profile} />
        </>
      }
    />
  );
};

export default ProductDetailsPage;
