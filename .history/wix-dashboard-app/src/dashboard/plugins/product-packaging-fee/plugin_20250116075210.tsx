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
import { orders } from '@wix/ecom'
import { additionalFees } from "@wix/ecom/service-plugins";



const ProductPackagingFeesPlugin: FC = () => {
  const [currentProduct, setCurrentProduct] = useState<orders.Order>();
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
                  
                    
                
                    
                    }}>Calculate Fees</Button>
                </Cell>
              )}
            </Layout>
          </Card.Content>
        </Card>
      </WixDesignSystemProvider>
    );
  

}

export default withProviders(ProductPackagingFeesPlugin);

// {"__type":"service-plugin-definition","componentType":"ECOM_ADDITIONAL_FEES","methods":[{"name":"calculateAdditionalFees","primaryHttpMappingPath":"/v1/calculate-additional-fees","transformations":{}}]}