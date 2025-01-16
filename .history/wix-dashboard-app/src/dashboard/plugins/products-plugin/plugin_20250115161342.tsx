import React, { useCallback, useMemo, useState, type FC } from 'react';
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
  AutoComplete,
  Layout,
  Cell,
  Page,
  EmptyState,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { withProviders } from "../../withProviders";
import { Product } from "../../pages/products/Product";
import { useQuery } from "react-query";
import { products } from "@wix/stores";

const PluginProducts: FC = () => {

  const [currentProduct, setCurrentProduct] = useState<products.Product>();
    const [searchQuery, setSearchQuery] = useState<string>("");
  
    const {
      data: storeProducts,
      isLoading,
      error,
    } = useQuery(["products", searchQuery], () =>
      products.queryProducts().startsWith("name", searchQuery).find(),
    );
  
    const options = useMemo(
      () =>
        storeProducts?.items.map((product) => ({
          id: product._id!,
          value: product.slug,
        })),
      [storeProducts],
    );
  
    const handleSelect = useCallback(
      (event) => {
        setCurrentProduct(
          storeProducts!.items.find(
            (product) => product._id === (event.id as string),
          ),
        );
      },
      [storeProducts, setCurrentProduct],
    );
  
    const handleChange = useCallback(
      (event) => {
        setSearchQuery(event.target.value);
        setCurrentProduct(undefined);
      },
      [setSearchQuery, setCurrentProduct],
    );
  
    if (error) {
      return (
        <EmptyState
          theme="page-no-border"
          title="We coudn't load products"
          subtitle="Please try again later"
        />
      );
    };
  

  
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Products Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
                <Layout>
                    <Cell>
                      <Card>
                        <Card.Header title="Select a product" />
                        <Card.Content>
                          <AutoComplete
                            size="large"
                            status={isLoading ? "loading" : undefined}
                            options={options}
                            onSelect={handleSelect}
                            onChange={handleChange}
                            value={currentProduct?.slug ?? undefined}
                            placeholder="Select a product"
                          />
                        </Card.Content>
                      </Card>
                    </Cell>
                    {currentProduct && (
                      <Cell>
                        <Product product={currentProduct} />
                      </Cell>
                    )}
          
                
                  </Layout>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default PluginProducts;
