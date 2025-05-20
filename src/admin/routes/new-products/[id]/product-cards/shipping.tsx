import { Container } from "../../../../components/container";
import { Header } from "../../../../components/header";
import { ChevronRight, LockClosedSolidMini, Pencil } from "@medusajs/icons";
import { Text } from "@medusajs/ui";
import {  ShippingProfile } from "../../../../../types/product";

export default function ShippingCard({ shippingProfile }: { shippingProfile?: ShippingProfile }) {
  return (
    <Container>
      <Header
        title="Shipping configuration"
        actions={[
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
     
     <div className="bg-ui-bg-base rounded-lg border mb-2 mx-4 flex items-center bg-ui-bg-field px-4 py-2 justify-between cursor-pointer hover:bg-ui-bg-component-hover">
        <div className="flex items-center gap-3">
          <span className="bg-ui-bg-subtle rounded p-2">
            <LockClosedSolidMini />
          </span>
          <div>
            <Text weight="plus"> {shippingProfile?.name || "Default Shipping Profile"} </Text>
            <div>
              <Text size="small" className="text-ui-fg-subtle">
                {shippingProfile?.type || "default"}
              </Text>
            </div>
          </div>
        </div>
        <ChevronRight className="text-ui-fg-muted" />
      </div>
    </Container>
  );
}
