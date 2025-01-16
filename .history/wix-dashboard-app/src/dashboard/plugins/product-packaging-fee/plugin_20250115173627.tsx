import React, { type FC, useState } from 'react';
import {
  Box, 
  Image, 
  Breadcrumbs,
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import "@wix/design-system/styles.global.css";
import { products } from "@wix/stores";
import { CollectionPage } from "@wix/patterns/page";
import {
  useTableCollection,
  Table,
  PrimaryPageButton,
  useOptimisticActions,
  deleteSecondaryAction,
  MultiBulkActionToolbar,
  CustomColumns,
  Filter,
  CollectionToolbarFilters,
  dateRangeFilter,
  RangeItem,
  DateRangeFilter,
  RadioGroupFilter,
  stringsArrayFilter,
} from "@wix/patterns";

import { withProviders } from "../../withProviders";
import { Product } from "../../pages/products/Product";
import { useQuery } from "react-query";

type TableFilters = {
  productType: Filter<products.ProductType[]>;
  lastUpdated: Filter<RangeItem<Date>>;
}

type SupportedQueryFields = Parameters<products.ProductsQueryBuilder['ascending']>[0] | Parameters<products.ProductsQueryBuilder['descending']>[0]




const ProductPackagingFeesPlugin: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Dashboard Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Text>
            This dashboard plugin was generated with Wix CLI. Customize it according to your logic. To learn more, read our{' '}
            <TextButton as="a" href="https://wix.to/dFFuEki" target="_blank">
              documentation
            </TextButton>
            .
          </Text>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default ProductPackagingFeesPlugin;
