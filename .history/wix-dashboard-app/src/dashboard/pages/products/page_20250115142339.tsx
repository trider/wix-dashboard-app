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
import { withProviders } from "../../withProviders";
import { ProductChat } from "./ProductChat";
// import "./styles.global.css";

export default withProviders(function ProductsPage() {
 const [currentProduct, setCurrentProduct] = React.useState({
   name: "Test Name",
   sku: "Test SKU",
 });
 const [searchQuery, setSearchQuery] = React.useState("");

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
