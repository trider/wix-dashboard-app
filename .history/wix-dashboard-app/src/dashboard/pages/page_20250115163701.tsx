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
import ProductsPlugin from '../plugins/products-plugin/plugin'
// import Panel from '../../site/widgets/custom-elements/my-widget/panel';


// const pluginId = "5f3929b4-91f3-4900-bfc5-e10fdaac3242";






const Index: FC = () => {

  return (
    <WixDesignSystemProvider 
      features={{ newColorsBranding: true}}
     >
      <Page>
        <Page.Header
          title="Dashboard Page"
          subtitle="Add management capabilities to your app."
          actionsBar={
            <Button
              onClick={() => {
                dashboard.showToast({
                  message: 'Your second toast message!',
                });
              }}
              prefixIcon={<Icons.GetStarted />}
            >
              Show a toast
            </Button>
          }
        />
        <Page.Content>
          <ProductsPlugin />
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
