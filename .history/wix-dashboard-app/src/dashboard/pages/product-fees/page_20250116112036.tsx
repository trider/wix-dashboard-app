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

import Plugin from '../../plugins/my-plugin/plugin'
import ProductsPlugin from '../../plugins/products-plugin/plugin'
import ProductPackagingFeesPlugin from '../../plugins/product-packaging-fee/plugin';
import type { AdditionalFee } from '../../../types';
import { CollectionPage } from '@wix/patterns/page';
import { PrimaryActions, useTableCollection } from '@wix/patterns';
import { WixPatternsProvider } from '@wix/patterns/provider';



const FeesTable:FC = () =>{

  const addAdditionalFee = (fee: AdditionalFee) =>{
    console.log(fee)
  }

  return (

    <CollectionPage>
     <CollectionPage.Header
     title={{ text: 'Additional Fees' }}
     primaryAction={<PrimaryActions label='Add Fee' onClick={() =>
     dashboard.openModal ('d6cdf4a9-71e0-4af8-aedb-eaec5d32d281', {
     addAdditionalFee })} />}
    />


      <CollectionPage.Content>
      <div>Hello</div>
      </CollectionPage.Content>

    </CollectionPage>
  )
}






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
        <EmptyState
          image={
            <Image fit="contain" height="100px" src={wixLogo} transparent />
          }
          title="Start editing this dashboard page"
          subtitle="Learn how to work with dashboard pages and how to add functionality to them using Wix APIs."
          theme="page"
        >
        <br/>
        <TextButton
          as="a"
          href="https://dev.wix.com/docs/build-apps/develop-your-app/frameworks/wix-cli/supported-extensions/dashboard-extensions/dashboard-pages/add-dashboard-page-extensions-with-the-cli#add-dashboard-page-extensions-with-the-cli"
          target="_blank"
          prefixIcon={<Icons.ExternalLink />}
        >
          Dashboard pages documentation
        </TextButton>
       
        </EmptyState>
        <br/>
        <WixPatternsProvider>
        <FeesTable/>
        </WixPatternsProvider>
        
        <Plugin staffResourceId="11111111" scheduleId="yourScheduleId" timezone="yourTimezone" />
        <br/>
        <ProductsPlugin />
        <br/>
        <ProductPackagingFeesPlugin />
       
   
      
      </Page.Content>
    </Page>
  </WixDesignSystemProvider>

  );
};

export default Index;
