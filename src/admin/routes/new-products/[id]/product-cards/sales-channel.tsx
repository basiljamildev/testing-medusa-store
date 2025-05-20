import { Container } from "../../../../components/container";
import { Trans, useTranslation } from "react-i18next"
import { Header } from "../../../../components/header";
import { Channels, Pencil } from "@medusajs/icons";
import { Text, Tooltip } from "@medusajs/ui";
import {  SalesChannel } from "../../../../../types/product";

export default function SalesChannelCard({ salesChannels }: { salesChannels?: SalesChannel[] }) {

    // const { count } = useSalesChannels()
    const { t } = useTranslation()
  
    const availableInSalesChannels =
      salesChannels?.map((sc) => ({
        id: sc.id,
        name: sc.name,
      })) ?? []
  
    const firstChannels = availableInSalesChannels.slice(0, 3)
    const restChannels = availableInSalesChannels.slice(3)
    
  return (
    <Container>
      <Header
        title="Sales Channels"
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
       <div className="grid grid-cols-[28px_1fr] items-center gap-x-3">
        <div className="bg-ui-bg-base shadow-borders-base flex size-7 items-center justify-center rounded-md">
          <div className="bg-ui-bg-component flex size-6 items-center justify-center rounded-[4px]">
            <Channels className="text-ui-fg-subtle" />
          </div>
        </div>
        {availableInSalesChannels.length > 0 ? (
          <div className="flex items-center gap-x-1">
            <Text size="small" leading="compact">
              {firstChannels.map((sc) => sc.name).join(", ")}
            </Text>
            {restChannels.length > 0 && (
              <Tooltip
                content={
                  <ul>
                    {restChannels.map((sc) => (
                      <li key={sc.id}>{sc.name}</li>
                    ))}
                  </ul>
                }
              >
                <Text
                  size="small"
                  leading="compact"
                  className="text-ui-fg-subtle"
                >
                  {`+${restChannels.length}`}
                </Text>
              </Tooltip>
            )}
          </div>
        ) : (
          <Text size="small" leading="compact" className="text-ui-fg-subtle">
            {t("products.noSalesChannels")}
          </Text>
        )}
      </div>
      <div>
        <Text className="text-ui-fg-subtle" size="small" leading="compact">
          <Trans
            i18nKey="sales_channels.availableIn"
            values={{
              x: availableInSalesChannels.length,
              y:  0,
            }}
            components={[
              <span
                key="x"
                className="text-ui-fg-base txt-compact-medium-plus"
              />,
              <span
                key="y"
                className="text-ui-fg-base txt-compact-medium-plus"
              />,
            ]}
          />
        </Text>
      </div>
    </Container>
  );
}
