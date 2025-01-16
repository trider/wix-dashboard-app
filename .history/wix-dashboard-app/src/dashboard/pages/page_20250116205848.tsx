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
import * as Icons from '@wix/wix-ui-icons-common';
import wixLogo from './wix_logo.svg';

import Plugin from '../plugins/my-plugin/plugin'
import ProductsPlugin from '../plugins/products-plugin/plugin'
import ProductPackagingFeesPlugin from '../plugins/product-packaging-fee/plugin';
import OrdersPlugin from '../plugins/orders-plugin/plugin'


const Index: FC = () => {



  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
    <Page>
      <Page.Header
        title="Dashboard Page"
        subtitle="Manage your app."
        actionsBar={
          <Button
            onClick={() => {
              dashboard.openModal('428ff0c5-d33d-4b1f-b218-9ec9fb1e636f')
        
            }}
            prefixIcon={<Icons.AddSmall />}
          >
            Add fee
          </Button>
        }
      />
      <Page.Content>
        <ProductsPlugin />
        <br/>
        <OrdersPlugin/>
      </Page.Content>
    </Page>
  </WixDesignSystemProvider>

  );
};

export default Index;
