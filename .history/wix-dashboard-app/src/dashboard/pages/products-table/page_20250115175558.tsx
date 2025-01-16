import React, { type FC, useState } from 'react';
import { EmptyState, Page, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';



import {
  Box,
  Text,
  Image,
  Breadcrumbs
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { products } from '@wix/stores';
import { CollectionPage } from '@wix/patterns/page';
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
} from '@wix/patterns';
import { withProviders } from '../withProviders';
import { useCreateProduct, useDeleteProducts } from '../hooks/stores';
import { CreateProductModal } from '../components/create-product';

type TableFilters = {
  productType: Filter<products.ProductType[]>;
  lastUpdated: Filter<RangeItem<Date>>;
}

type SupportedQueryFields = Parameters<products.ProductsQueryBuilder['ascending']>[0] | Parameters<products.ProductsQueryBuilder['descending']>[0]

const productTypeToDisplayName: {[key in products.ProductType] : string | undefined} = {
  [products.ProductType.physical]: 'Physical',
  [products.ProductType.digital]: 'Digital',
  [products.ProductType.unspecified_product_type]: undefined
}

const DashboardPage: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Products Table"
          subtitle="This is a subtitle for your page"
        />
        <Page.Content>
          <EmptyState
            title="Products Table"
            subtitle="Edit src/dashboard/pages/products-table/page.tsx to change this text."
            theme="page"
          />
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;
