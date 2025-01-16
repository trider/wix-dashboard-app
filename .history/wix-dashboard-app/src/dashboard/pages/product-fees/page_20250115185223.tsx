import React, { type FC,useEffect } from 'react';
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
import { additionalFees } from "@wix/ecom/service-plugins";

const pluginId = "975bffb7-3c04-42cc-9840-3d48c24e73d5";

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;
    // Use the `request` and `metadata` received from Wix and
    // apply custom logic.
    return {
      // Return your response exactly as documented to integrate with Wix.
      // Return value example:
      additionalFees: [
        {
          code: "subscription-fee",
          name: "Subscription Fee",
          price: "5",
          taxDetails: {
            taxable: true,
          },
        },
      ],
      currency: "USD",
    };
  },
});


const DashboardPage: FC = () => {
  
  // useEffect(() => {
  //   dashboard
  // .addSitePlugin(pluginId, { })
  // .then(() => {
  //   console.log("Plugin added successfully");
  // })
  // .catch((error) => {
  //   console.error("Error adding plugin:", error);
  // });
  // });

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
