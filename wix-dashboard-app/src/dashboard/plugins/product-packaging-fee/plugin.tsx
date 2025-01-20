import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
  AutoComplete,
  Page,
  EmptyState,
  Layout,
  FormField,
  Dropdown,
  Cell,
  Input,
  Box,
  CustomModalLayout,
  InputArea,
  NumberInput,
  SectionHeader,
  SectionHeaderDivider,
  Button,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { withProviders } from "../../withProviders";
import { ProductDetails } from "./ProductDetails";
import { useQuery } from "react-query";
import { products } from "@wix/stores";
import { checkout } from "@wix/ecom";
import { httpClient } from "@wix/essentials";


import { AdditionalFee } from "../../../types";

const ProductPackagingFeesPlugin: FC = () => {
  const [currentProduct, setCurrentProduct] = useState<products.Product>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [additionalFees, setAdditionalFee] = useState<AdditionalFee | null>(
    null
  );
  const [feeName, setFeeName] = useState("Packing");
  const [feeAmount, setFeeAmount] = useState(10);
  const [feeDescription, setFeeDescription] = useState("Description of fee");
 


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

  const createOrder = async (
    id: string,
    options: checkout.CreateOrderOptions
  ) => {
    const response = await checkout.createOrder(id, options).then((data) => {
      alert(JSON.stringify(data));
      return data;
    });
    console.log(response);
  };

  const updateCheckout = async (
    id: string,
    updateCheckout: checkout.UpdateCheckout,
    options: checkout.UpdateCheckoutOptions
  ) => {
    const response = await checkout
      .updateCheckout(id, updateCheckout, options)
      .then((data) => {
        alert(JSON.stringify(data));
        console.log(data);
        return data;
      });

    const orderOptions: checkout.CreateOrderOptions = {
      delayCapture: true,
      savePaymentMethod: false,
    };

    // createOrder(id,orderOptions)
  };

  const addAdditionalFeesToProduct = async (
    id: string,
    payload: checkout.AddToCheckoutOptions,
    options: checkout.UpdateCheckoutOptions
  ) => {
    const additionalFeeResponse = await httpClient
      .fetchWithAuth(
        `${import.meta.env.BASE_API_URL}/additional-fees?productId=${
          currentProduct?._id
        }`
      )
      .then((data) => {
        console.log(data);
        return data;
      });

    const additionalFeeData = await additionalFeeResponse.json();

    setAdditionalFee(additionalFeeData);
    alert(JSON.stringify(additionalFeeData));
    console.log(additionalFeeData);
    // updateCheckout(id, payload, options);
  };

  const addAdditionalFees = async (id: string, payload: checkout.AddToCheckoutOptions,
    options: checkout.UpdateCheckoutOptions, fee:AdditionalFee
  ) => {
    const feeResp = await httpClient.fetchWithAuth (`${import.meta.env.BASE_API_URL}/additional-fees`, {
    method: 'POST',
    body: JSON.stringify(fee)
  })
  const feeData = await feeResp.json();
  alert(JSON.stringify(feeData));
  console.log(feeData);
  addAdditionalFeesToProduct(id, payload, options);
}

  const calculateCheckoutFees = async (
    id: string,
    payload: checkout.AddToCheckoutOptions,
    options: checkout.UpdateCheckoutOptions
  ) => {
    const fee = await httpClient.fetchWithAuth(
      `${import.meta.env.BASE_API_URL}/additional-fees/calculateAdditionalFees`,
      {
        method: "POST",
        body: JSON.stringify({
          name: feeName,
          price: { 
            amount: feeAmount,
            formattedAmount:`${feeAmount.toString()}.00₪`
          },
          providerAppId: "1380b703-ce81-ff05-f115-39571d94dfcd",
          priceBeforeTax: {
            amount: feeAmount,
            formattedAmount:`${feeAmount.toString()}.00₪`
          },
          priceAfterTax: {
            amount: feeAmount,
            formattedAmount:`${feeAmount.toString()}.00₪`
          },
          lineItemIds: ["df19c1f7-07d8-a265-42f8-e8dfa824cc6e"],
          _id: "bfa25fb0-b47c-466d-964f-bb0e3e77710f",
        }),
      }
    );

    const feeData = await fee.json();
    alert(JSON.stringify(feeData));
    console.log(feeData);
    addAdditionalFees(id, payload, options, feeData);
  };

  const addToCheckout = async (
    id: string,
    options: checkout.AddToCheckoutOptions
  ) => {
    const response = await checkout.addToCheckout(id, options).then((data) => {
      alert(JSON.stringify(data));
      console.log(data);
      return data;
    });

    const payload: checkout.UpdateCheckout = {
      shippingInfo: {
        shippingDestination: {
          address: {
            addressLine1: "test",
          },
        },
      },
    };

    const payloadOptions: checkout.UpdateCheckoutOptions = {
      lineItems: [
        {
          catalogReference: {
            catalogItemId: "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
            appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
          },

          quantity: 1,
        },
      ],
    };

    return calculateCheckoutFees(id, payload, payloadOptions);
  };

  const createCheckout = async (options: checkout.CreateCheckoutOptions, productId:any) => {
    const response: any = await checkout.createCheckout(options).then((data) => {
        alert(JSON.stringify(data));
        return data;
      });
    console.log(response);
   
    const payload: checkout.AddToCheckoutOptions = {
      lineItems: [
        {
          catalogReference: {
            catalogItemId:productId,
            appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
          },

          quantity: 1,
        },
      ],
    };
    return addToCheckout(response._id, payload);
  };

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
                <Card.Divider />
                <SectionHeader title="Additional Fee"></SectionHeader>
                <br />
                <Layout>
                  <Cell span={6}>
                    <FormField label="Name">
                      <Input
                        value={feeName}
                        onChange={(e) => setFeeName(e.target.value)}
                      />
                    </FormField>
                  </Cell>
                  <Cell span={6}>
                    <FormField label="Additional Fee">
                      <Input value={feeAmount} />
                    </FormField>
                  </Cell>
                  <Cell>
                    <FormField label="Description">
                      <InputArea value={feeDescription} />
                    </FormField>
                  </Cell>
                  <Cell>
                  <Button
                  onClick={(e) => {
                    const productId = currentProduct._id?.toString();
                    const lineItems:any = [];
                    lineItems.push(currentProduct._id)
                    const payload: checkout.CreateCheckoutOptions = {
                      channelType: checkout.ChannelType.BACKOFFICE_MERCHANT,
                      
                      checkoutInfo:{
                        shippingInfo:{
                          selectedCarrierServiceOption:{
                            code:'8043d76c-4c09-4f3f-8da4-3401837e1e6c'
                          },
                        
                          shippingDestination:{
                            address:{
                              addressLine1:'test'
                            }
                          }
                          
                        },
                        additionalFees: [
                          {
                            name: feeName,
                            price: { amount: feeAmount.toString() },
                            providerAppId: "1380b703-ce81-ff05-f115-39571d94dfcd",
                            priceBeforeTax: {
                              amount:feeAmount.toString(),
                              formattedAmount:`${feeAmount.toString()}.00₪`
                            },
                            priceAfterTax: {
                              amount: feeAmount.toString(),
                              formattedAmount:`${feeAmount.toString()}.00₪`
                            },
                            lineItemIds: lineItems,
                           
                          },
                        ],
                      },
                      
                      lineItems: [
                        {
                          catalogReference: {
                            catalogItemId:currentProduct._id,
                            appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
                          },

                          quantity: 1,
                        },
                      ],
                    };
                    createCheckout(payload,productId);
                  }}
                >
                  Checkout
                </Button>
                  </Cell>
                </Layout>
              </Cell>
            )}
          </Layout>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default withProviders(ProductPackagingFeesPlugin);
