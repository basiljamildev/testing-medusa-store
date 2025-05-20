import { Container } from "../../../../components/container";
import { Header } from "../../../../components/header";
import { SectionRow } from "../../../../components/section-row";
import { getProductStatusColor } from "../../product-helpers";
import { StatusBadge } from "@medusajs/ui";
import { Pencil } from "@medusajs/icons";
import { Product } from "../../../../../types/product";

export default function DetailsCard({ product }: { product?: Product }) {
  const Status: any = getProductStatusColor(product?.status || "draft");

  return (
    <Container className="divide-y">
      <Header
        title={product?.title || ""}
        actions={[
          {
            type: "custom",
            children: (
              <StatusBadge color={Status.color}>{Status.text}</StatusBadge>
            ),
          },
          {
            type: "action-menu",
            props: {
              groups: [
                {
                  actions: [
                    {
                      icon: <Pencil />,
                      label: "Edit",
                      onClick: () => {
                        alert("You clicked the edit action!");
                      },
                    },
                  ],
                },
              ],
            },
          },
        ]}
      />
      <SectionRow title="Description" value={product?.description || "-"} />
      <SectionRow title="Subtitle" value={product?.subtitle || "-"} />
      <SectionRow title="Handle" value={`/${product?.handle || "-"}`} />
      <SectionRow
        title="Discountable"
        value={product?.discountable ? "True" : "False"}
      />
      {/* <SectionRow title="Brand" value={product?.brand?.name || "-"} /> */}
    </Container>
  );
}
