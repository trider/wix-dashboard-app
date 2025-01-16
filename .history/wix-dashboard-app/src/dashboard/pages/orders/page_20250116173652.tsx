import React, { type FC } from 'react';
import { EmptyState, Page, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import OrdersPlugin from '../../plugins/orders-plugin/plugin'


const DashboardPage: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Orders"
          subtitle="This page manages orders"
        />
        <Page.Content>
        
          <OrdersPlugin/>
     
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;
