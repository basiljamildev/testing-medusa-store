import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Pencil, TagSolid } from "@medusajs/icons";
import { useQuery } from "@tanstack/react-query";
import { sdk } from "../../lib/sdk";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Add navigation hook
import {
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  useDataTable,
} from "@medusajs/ui";
import { ActionMenu } from "../../components/action-menu";
import { Header } from "../../components/header";
import { Container } from "../../components/container";
import { getProductStatusColor } from "./product-helpers";

// type Variant = {
//     id: string;
//     title: string;
//     sku: string;
//     barcode: string;
//     ean: string;
//     upc: string;
//     inventory_quantity: number;
//     allow_backorder: boolean;
//     manage_inventory: boolean;
//     hs_code: string;
//     origin_country: string;
//     mid_code: string;
//     material: string;
//     weight: number;
//     length: number;
//     width: number;
//     height: number;
//   };

type Collection = {
  id: string;
  title: string;
  handle: string;
  metadata: null;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
};

type SalesChannel = {
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

type Product = {
  id: string;
  title: string;
  handle: string;
  collection: Collection;
  sales_channels: SalesChannel[];
  variants: Variant[];
  status: string;
  thumbnail?: string;
};

type ProductsResponse = {
  products: Product[];
  count: number;
  limit: number;
  offset: number;
};

const columnHelper = createDataTableColumnHelper<Product>();

const columns = [
  columnHelper.accessor("title", {
    header: "Product",
    cell: ({ row }) => {
      const title = row.original.title;
      const thumbnail = row.original.thumbnail;
      return (
        <div className="flex items-center gap-2">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="w-10 h-10 object-cover rounded"
              style={{ minWidth: 40, minHeight: 40 }}
            />
          )}
          <span>{title}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("collection.title", {
    header: "Collection",
  }),
  columnHelper.accessor("sales_channels", {
    header: "Sales Channels",
    cell: ({ getValue }) => {
      const salesChannels = getValue() as SalesChannel[];
      return salesChannels.map((sc) => sc.name).join(", ");
    },
  }),
  columnHelper.accessor("variants", {
    header: "Variants",
    cell: ({ getValue }) => {
      const variants = getValue() as Variant[];
      const count = variants.length;
      return `${count} variant${count !== 1 ? "s" : ""}`;
    },
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
     const Status = getProductStatusColor(status)
      return (
        <span className="flex items-center gap-2">
          <span
            className={`w-2 h-2 rounded-full inline-block `}
            style={{ backgroundColor: Status.color }}
          ></span>
          {Status.text}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "",
    cell: () => {
      return (
        <ActionMenu
          groups={[
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
          ]}
        />
      );
    },
  }),
];

const NewProductsPage = () => {
  const limit = 15;
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });

  const offset = useMemo(() => {
    return pagination.pageIndex * limit;
  }, [pagination]);

  const { data, isLoading } = useQuery<ProductsResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/products`, {
        query: {
          limit,
          offset,
          is_giftcard: false,
          fields:
            "id,title,handle,status,*collection,*sales_channels,+brand.*,variants.id,thumbnail",
        },
      }),
    queryKey: [["products", limit, offset]],
  });

  console.log(data);

  const navigate = useNavigate();
  const table = useDataTable({
    columns,
    data: data?.products || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
    onRowClick: (event, row) => {
        console.log(event)
        navigate(`/new-products/${row.id}`)
      },
    
  });

  return (
    <Container>
         <Header 
        title="New Products"
        actions={[
          {
            type: "button",
            props: {
              children: "Export",
              variant: "secondary",
              onClick: () => {
                alert("You clicked the button.")
              },
            },
          },
          {
            type: "button",
            props: {
              children: "Import",
              variant: "secondary",
              onClick: () => {
                alert("You clicked the button.")
              },
            },
          },
          {
            type: "button",
            props: {
              children: "Create",
              variant: "secondary",
              onClick: () => {
                alert("You clicked the button.")
              },
            },
          },
        ]}
      />
      <DataTable instance={table}>
        
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "New Products",
  icon: TagSolid,
});

export default NewProductsPage;



// import { defineRouteConfig } from "@medusajs/admin-sdk"
// import { ChatBubbleLeftRight } from "@medusajs/icons"
// import { 
//   Badge,
//   createDataTableColumnHelper,
//   createDataTableFilterHelper,
//   DataTable,
//   DataTableFilteringState,
//   DataTablePaginationState,
//   DataTableSortingState,
//   Heading,
//   useDataTable,
// } from "@medusajs/ui"
// import { useQuery } from "@tanstack/react-query"
// import { SingleColumnLayout } from "../../layouts/single-column"
// import { useMemo, useState } from "react"
// import { Container } from "../../components/container"
// import { HttpTypes, ProductStatus } from "@medusajs/framework/types"
// import { sdk } from "../../lib/sdk"

// const columnHelper = createDataTableColumnHelper<HttpTypes.AdminProduct>()

// const columns = [
//   columnHelper.accessor("title", {
//     header: "Title",
//     // Enables sorting for the column.
//     enableSorting: true,
//     // If omitted, the header will be used instead if it's a string, 
//     // otherwise the accessor key (id) will be used.
//     sortLabel: "Title",
//     // If omitted the default value will be "A-Z"
//     sortAscLabel: "A-Z",
//     // If omitted the default value will be "Z-A"
//     sortDescLabel: "Z-A",
//   }),
//   columnHelper.accessor("status", {
//     header: "Status",
//     cell: ({ getValue }) => {
//       const status = getValue()
//       return (
//         <Badge color={status === "published" ? "green" : "grey"} size="xsmall">
//           {status === "published" ? "Published" : "Draft"}
//         </Badge>
//       )
//     },
//   }),
// ]

// const filterHelper = createDataTableFilterHelper<HttpTypes.AdminProduct>()

// const filters = [
//   filterHelper.accessor("status", {
//     type: "select",
//     label: "Status",
//     options: [
//       {
//         label: "Published",
//         value: "published",
//       },
//       {
//         label: "Draft",
//         value: "draft",
//       },
//     ],
//   }),
// ]

// const limit = 15

// const CustomPage = () => {
//   const [pagination, setPagination] = useState<DataTablePaginationState>({
//     pageSize: limit,
//     pageIndex: 0,
//   })
// 	const [search, setSearch] = useState<string>("")
// 	const [filtering, setFiltering] = useState<DataTableFilteringState>({})
//   const [sorting, setSorting] = useState<DataTableSortingState | null>(null)

//   const offset = useMemo(() => {
//     return pagination.pageIndex * limit
//   }, [pagination])
//   const statusFilters = useMemo(() => {
//     return (filtering.status || []) as ProductStatus
//   }, [filtering])

//   const { data, isLoading } = useQuery({
//     queryFn: () => sdk.admin.product.list({
//       limit,
//       offset,
//       q: search,
//       status: statusFilters,
//       order: sorting ? `${sorting.desc ? "-" : ""}${sorting.id}` : undefined,
//     }),
//     queryKey: [["products", limit, offset, search, statusFilters, sorting?.id, sorting?.desc]],
//   })

//   const table = useDataTable({
//     columns,
//     data: data?.products || [],
//     getRowId: (row) => row.id,
//     rowCount: data?.count || 0,
//     isLoading,
//     pagination: {
//       state: pagination,
//       onPaginationChange: setPagination,
//     },
//     search: {
// 	    state: search,
// 	    onSearchChange: setSearch,
//     },
//     filtering: {
//       state: filtering,
//       onFilteringChange: setFiltering,
//     },
//     filters,
//     sorting: {
//       // Pass the pagination state and updater to the table instance
//       state: sorting,
//       onSortingChange: setSorting,
//     },
//   })

//   return (
//     <SingleColumnLayout>
//       <Container>
//         <DataTable instance={table}>
//           <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
//             <Heading>Products</Heading>
//             <div className="flex gap-2">
//               <DataTable.FilterMenu tooltip="Filter" />
//               <DataTable.SortingMenu tooltip="Sort" />
//               <DataTable.Search placeholder="Search..." />
//             </div>
//           </DataTable.Toolbar>
//           <DataTable.Table />
//           <DataTable.Pagination />
//         </DataTable>
//       </Container>
//     </SingleColumnLayout>
//   )
// }

// export const config = defineRouteConfig({
//   label: "Custom",
//   icon: ChatBubbleLeftRight,
// })

// export default CustomPage