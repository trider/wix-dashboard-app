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
import Plugin from '../plugins/my-plugin/plugin';
import CheckoutPlugin from '../plugins/my-checkout/plugin';



const Index: FC = () => {

  const orderUpdate = ( ) => {
    alert()
  }

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
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
          <EmptyState
            image={
              <Image fit="contain" height="100px" src={wixLogo} transparent />
            }
            title="Start editing this dashboard page"
            subtitle="Learn how to work with dashboard pages and how to add functionality to them using Wix APIs."
            theme="page"
          >
            <TextButton
              as="a"
              href="https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/dashboard-extensions/dashboard-pages/add-dashboard-page-extensions-with-the-cli#add-dashboard-page-extensions-with-the-cli"
              target="_blank"
              prefixIcon={<Icons.ExternalLink />}
            >
              Dashboard pages documentation
            </TextButton>
         
          </EmptyState>
          <Plugin staffResourceId="11111111" scheduleId="yourScheduleId" timezone="yourTimezone" />
          <CheckoutPlugin orderId='222222' onOrderUpdate={orderUpdate} />
     
        
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default Index;
