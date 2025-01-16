import {
 AutoComplete,
 Card,
 TableActionCell,
 Divider,
 Layout,
 Page,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import React from "react";
import { withProviders } from "../../../withProviders";
import { ProductChat } from "./ProductChat";
import './ProductChat.module.css';
import { products } from "@wix/stores";
import { useQuery } from "react-query";

const { queryProducts } = products;

export default withProviders(function ProductsPage() {
 // const [currentProduct, setCurrentProduct] = React.useState({
 //   name: "Test Name",
 //   sku: "Test SKU",
 // });
 const [currentProduct, setCurrentProduct] = React.useState<
  products.Product | undefined
>();

 const [searchQuery, setSearchQuery] = React.useState("");

 const {
  data: products,
  isLoading,
  error,
} = useQuery(["products", searchQuery], () =>
  queryProducts().startsWith("name", searchQuery).find(),
);


if (error) return <div>Something went wrong</div>;


 return (
   <Page>
     <Page.Header title="Chat about Products" />
     <Page.Content>
       <Layout>
         <TableActionCell>
           <Card>
             <Card.Header title="Select a product to chat about" />
             <Card.Content>
               <AutoComplete
                 placeholder="Select product to chat about"
                 size="large"
                 status={isLoading ? 'loading' : undefined}
               />
             </Card.Content>
           </Card>
         </TableActionCell>

         <Divider />
         <TableActionCell>
           {currentProduct && <ProductChat product={currentProduct} />}
         </TableActionCell>
       </Layout>
     </Page.Content>
   </Page>
 );
});
