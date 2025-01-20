import React, { useCallback, useMemo, useState, type FC } from "react";
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
  AutoComplete,
  Layout,
  Cell,
  Page,
  Button,
  EmptyState,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { withProviders } from "../../withProviders";
import { ProductDetails } from './ProductDetails'
import { useQuery } from "react-query";
import { products } from "@wix/stores";
import { checkout } from "@wix/ecom";



const ProductPackagingFeesPlugin: FC = () => {
  const [currentProduct, setCurrentProduct] = useState<products.Product>();
    const [searchQuery, setSearchQuery] = useState<string>("");
  
    const {
      data: storeProducts,
      isLoading,
      error,
    } = useQuery(["products", searchQuery], () =>
      products.queryProducts().startsWith("name", searchQuery).find()
    );
  
    const options = useMemo(
      () =>
        storeProducts?.items.map((product) => ({
          id: product._id!,
          value: product.slug,
        })),
      [storeProducts]
    );
  
    const handleSelect = useCallback(
      (event) => {
        setCurrentProduct(
          storeProducts!.items.find(
            (product) => product._id === (event.id as string)
          )
        );
      },
      [storeProducts, setCurrentProduct]
    );
  
    const handleChange = useCallback(
      (event) => {
        setSearchQuery(event.target.value);
        setCurrentProduct(undefined);
      },
      [setSearchQuery, setCurrentProduct]
    );


   

    const createCheckout = async (options:checkout.CreateCheckoutOptions) => {
      const response = await checkout.createCheckout(options).then((data)=>{
        alert(JSON.stringify(data))
        return data
      });
      console.log(response)
      
     
    }



  

   
  
    if (error) {
      return (
        <EmptyState
          theme="page-no-border"
          title="We coudn't load products"
          subtitle="Please try again later"
        />
      );
    }
  
    return (
      <WixDesignSystemProvider features={{ newColorsBranding: true }}>
        <Card>
          <Card.Header title="Select a product" />

          <Card.Content size="medium">
            <AutoComplete
              size="large"
              status={isLoading ? "loading" : undefined}
              options={options}
              onSelect={handleSelect}
              onChange={handleChange}
              value={currentProduct?.slug ?? undefined}
              placeholder="Select a product"
            />
            <Layout>
              {currentProduct && (
                <Cell>
                  <ProductDetails product={currentProduct} />
                  <Button  onClick={(e) => {
                    const id = currentProduct._id
                    const lineItems = [id]
                    const payload:checkout.CreateCheckoutOptions ={
                      channelType:checkout.ChannelType.BACKOFFICE_MERCHANT,
                      lineItems:[{
                        catalogReference:{
                            "catalogItemId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
                            "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e"
                          },

                        quantity:1
                      }]
               
                    }
                    createCheckout(payload)
                     
                
                    
                    }}>Checkout</Button>
                </Cell>
              )}
            </Layout>
          </Card.Content>
        </Card>
      </WixDesignSystemProvider>
    );
  

}

export default withProviders(ProductPackagingFeesPlugin);

