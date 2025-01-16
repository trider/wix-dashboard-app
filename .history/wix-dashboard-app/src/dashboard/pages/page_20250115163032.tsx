import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import ProductsPlugin from '../plugins/products-plugin/plugin'
import ProductPackagingFeesPlugin from '../plugins/product-packaging-fee/plugin';




const Index: FC = () => {

  return (
    <WixDesignSystemProvider 
      features={{ newColorsBranding: true}}
     >
      <Page>
        <Page.Header
          title="Products Dashboard"
          subtitle="Add management capabilities to your app."

        />
        <Page.Content>
          <ProductsPlugin />
          <ProductPackagingFeesPlugin />
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
