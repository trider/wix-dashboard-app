import React, { type FC } from 'react';
import { EmptyState, Page, WixDesignSystemProvider } from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const DashboardPage: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Page>
        <Page.Header
          title="Orders"
          subtitle="This is a subtitle for your page"
        />
        <Page.Content>
          <EmptyState
            title="Orders"
            subtitle="Edit src/dashboard/pages/orders/page.tsx to change this text."
            theme="page"
          />
        </Page.Content>
      </Page>
    </WixDesignSystemProvider>
  );
};

export default DashboardPage;
