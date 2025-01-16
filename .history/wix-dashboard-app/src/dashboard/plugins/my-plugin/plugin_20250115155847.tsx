// import React, { type FC } from 'react';
import React, { useCallback, useMemo, useState, type FC } from "react";
import { useQuery } from "react-query";
import { products } from "@wix/stores";
import {
  AutoComplete,
  Card,
  Layout,
  Cell,
  Page,
  EmptyState,
  WixDesignSystemProvider,
  Text,
  TextButton,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { withProviders } from "../../withProviders";
import { Product } from "../../pages/page.json";

import '@wix/design-system/styles.global.css';



interface Props {
  staffResourceId: string;
  scheduleId: string;
  timezone: string;
}

const ProductsPlugin: FC<Props> = ({ staffResourceId, scheduleId, timezone }) => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Dashboard Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Text>
           ID:{staffResourceId}<br/>


            This dashboard plugin was generated with Wix CLI. Customize it according to your logic. To learn more, read our{' '}
            <TextButton as="a" href="https://wix.to/dFFuEki" target="_blank">
              documentation
            </TextButton>
            
            .
          </Text>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default ProductsPlugin;
