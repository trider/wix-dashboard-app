import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  Page,
  WixDesignSystemProvider,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import * as Icons from '@wix/wix-ui-icons-common';
import wixLogo from './wix_logo.svg';

import Plugin from '../../plugins/my-plugin/plugin'
import ProductsPlugin from '../../plugins/products-plugin/plugin'
import ProductPackagingFeesPlugin from '../../plugins/product-packaging-fee/plugin';

const DashboardPage: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Product Fees"
          subtitle="Use this page to set product fees"
        />
        <Page.Content>
        <ProductPackagingFeesPlugin />
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;
