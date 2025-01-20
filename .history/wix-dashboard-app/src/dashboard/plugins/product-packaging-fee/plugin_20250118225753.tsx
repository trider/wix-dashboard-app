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
import { ProductDetails } from "./ProductDetails";
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

  const createCheckout = async (options: checkout.CreateCheckoutOptions) => {
    const response = await checkout.createCheckout(options).then((data) => {
      console.log(data);
      return data;
    });
    console.log(response);
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
                <Button
                  onClick={(e) => {
                    const id = currentProduct._id;
                    const lineItems = [id];
                    const payload: checkout.CreateCheckoutOptions = {
                      channelType: checkout.ChannelType.BACKOFFICE_MERCHANT,
                      lineItems: [
                        {
                          catalogReference: {
                            productName: {
                              original: "I'm a product",
                              translated: "I'm a product",
                            },
                            catalogReference: {
                              catalogItemId:
                                "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
                              appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
                            },
                            quantity: 1,
                            totalDiscount: {
                              amount: "0.00",
                              formattedAmount: "0.00 ₪",
                            },
                            descriptionLines: [],
                            image:
                              "wix:image://v1/22e53e_2fee033b2eca46cab4eec7fa74e99c31~mv2.jpg#originWidth=3000&originHeight=3000",
                            physicalProperties: {
                              sku: "364215376135191",
                              shippable: true,
                            },
                            itemType: { preset: "PHYSICAL" },
                            price: {
                              amount: "85.00",
                              formattedAmount: "85.00 ₪",
                            },
                            priceBeforeDiscounts: {
                              amount: "85.00",
                              formattedAmount: "85.00 ₪",
                            },
                            totalPriceBeforeTax: {
                              amount: "85.00",
                              formattedAmount: "85.00 ₪",
                            },
                            totalPriceAfterTax: {
                              amount: "85.00",
                              formattedAmount: "85.00 ₪",
                            },
                            paymentOption: "FULL_PAYMENT_ONLINE",
                            taxDetails: {
                              taxableAmount: {
                                amount: "0.00",
                                formattedAmount: "0.00 ₪",
                              },
                              taxRate: "0.0000",
                              totalTax: {
                                amount: "0.00",
                                formattedAmount: "0.00 ₪",
                              },
                            },
                            taxInfo: {
                              taxAmount: {
                                amount: "0.00",
                                formattedAmount: "0.00 ₪",
                              },
                              taxableAmount: {
                                amount: "0.00",
                                formattedAmount: "0.00 ₪",
                              },
                              taxRate: "0.0000",
                              taxIncludedInPrice: false,
                              taxBreakdown: [],
                            },
                            locations: [],
                            lineItemPrice: {
                              amount: "85.00",
                              formattedAmount: "85.00 ₪",
                            },
                            customLineItem: false,
                            rootCatalogItemId:
                              "df19c1f7-07d8-a265-42f8-e8dfa824cc6e",
                            taxableAddress: { addressType: "SHIPPING" },
                            priceUndetermined: false,
                            fixedQuantity: false,
                            _id: "00000000-0000-0000-0000-000000000001",
                          },
                          quantity: 1,
                        },
                      ],
                    };
                    createCheckout(payload);
                  }}
                >
                  Checkout
                </Button>
              </Cell>
            )}
          </Layout>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default withProviders(ProductPackagingFeesPlugin);
