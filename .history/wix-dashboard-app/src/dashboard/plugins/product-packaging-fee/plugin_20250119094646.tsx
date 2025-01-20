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
import { checkout, totalsCalculator } from "@wix/ecom";
import { dashboard } from "@wix/dashboard";
import { additionalFees } from "@wix/ecom/service-plugins/context";
import { httpClient } from "@wix/essentials";




const ProductPackagingFeesPlugin: FC = () => {
  const [currentProduct, setCurrentProduct] = useState<products.Product>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  
    const { data: storeProducts, isLoading, error } = useQuery(["products", searchQuery], () =>
      products.queryProducts().startsWith("name", searchQuery).find()
    );
  
    const options = useMemo(() =>
        storeProducts?.items.map((product) => ({ id: product._id!, value: product.slug,})),[storeProducts]
    );
  
    const handleSelect = useCallback((event) => {
        setCurrentProduct(storeProducts!.items.find((product) => product._id === (event.id as string)));
      },[storeProducts, setCurrentProduct]
    );
  
    const handleChange = useCallback(
      (event) => {
        setSearchQuery(event.target.value);
        setCurrentProduct(undefined);
      },[setSearchQuery, setCurrentProduct]
    );

  


    const createOrder = async (id:string, options:checkout.CreateOrderOptions) => {
      const response = await checkout.createOrder(id,options).then((data)=>{
        return data
      });
      console.log(response)
      alert(response)
      
     
    }


  

    const updateCheckout = async (id:string, updateCheckout:checkout.UpdateCheckout, options:checkout.UpdateCheckoutOptions) => {
//       const resp = await httpClient.fetchWithAuth (`${import.meta.env.BASE_API_URL}/additional-fees/calculate`, {
//         method: 'POST',
//         body: JSON.stringify({
//           "name": "wrapping",
//           "price": { "amount": "1000.00", "formattedAmount": "1,000.00 ₪" },
//           "providerAppId": "1380b703-ce81-ff05-f115-39571d94dfcd",
//           "priceBeforeTax": {
//             "amount": "1000.00",
//             "formattedAmount": "1,000.00 ₪"
//           },
//           "priceAfterTax": {
//             "amount": "1000.00",
//             "formattedAmount": "1,000.00 ₪"
//           },
//           "lineItemIds": [],
//           "_id": "bfa25fb0-b47c-466d-964f-bb0e3e77710f"
//         })
// })

      const response = await httpClient.fetchWithAuth (`${import.meta.env.BASE_API_URL}/additional-fees/calculate/calculateAdditionalFees`, {
              method: 'POST',
              body: JSON.stringify({
                "name": "wrapping",
                "price": { "amount": "1000.00", "formattedAmount": "1,000.00 ₪" },
                "providerAppId": "1380b703-ce81-ff05-f115-39571d94dfcd",
                "priceBeforeTax": {
                  "amount": "1000.00",
                  "formattedAmount": "1,000.00 ₪"
                },
                "priceAfterTax": {
                  "amount": "1000.00",
                  "formattedAmount": "1,000.00 ₪"
                },
                "lineItemIds": [],
                "_id": "bfa25fb0-b47c-466d-964f-bb0e3e77710f"
              })
      })
      alert(JSON.stringify(response))
      console.log(response)

   // const response = await checkout.updateCheckout(id,updateCheckout, options).then((data)=>{
      //   alert(JSON.stringify(data))
      //   console.log(data)
      //   return data
      // });
      
      
     
    }

    const addToCheckout = async (id:string, options:checkout.AddToCheckoutOptions) => {
      const response = await checkout.addToCheckout(id,options).then((data)=>{
        alert(JSON.stringify(data))
        console.log(data)
        return data
      });

      const payload:checkout.UpdateCheckout= {
        additionalFees: [
          {
            "name": "packing",
            "price": { "amount": "10.00", "formattedAmount": "1,000.00 ₪" },
            "providerAppId": "1380b703-ce81-ff05-f115-39571d94dfcd",
            "priceBeforeTax": {
              "amount": "10",
              "formattedAmount": "10.00 ₪"
            },
            "priceAfterTax": {
              "amount": "10",
              "formattedAmount": "10.00 ₪"
            },
            "lineItemIds": ["df19c1f7-07d8-a265-42f8-e8dfa824cc6e"],
           
          }
        ],

      }
      
      const payloadOptions:checkout.UpdateCheckoutOptions= {
        lineItems:[{
          catalogReference:{
              "catalogItemId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
              "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e"
            },
         

          quantity:1
        }]
      }

      return updateCheckout(id, payload, payloadOptions)
      
     
    }


   

    const createCheckout = async (options:checkout.CreateCheckoutOptions) => {
      const response:any= await checkout.createCheckout(options).then((data)=>{
        alert(JSON.stringify(data))
        return data
      });
      console.log(response)
      const payload:checkout.AddToCheckoutOptions= {
        lineItems:[{
          catalogReference:{
              "catalogItemId": "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
              "appId": "215238eb-22a5-4c36-9e7b-e7c08025e04e"
            },
         

          quantity:1
        }]
      }
      return addToCheckout(response._id, payload)
      
     
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

