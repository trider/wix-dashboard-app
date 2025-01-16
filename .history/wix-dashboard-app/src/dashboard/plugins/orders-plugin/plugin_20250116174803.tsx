import React, { useCallback, useEffect, useState, type FC } from "react";
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
  AutoComplete,
  Layout,
  Cell,
  Page,
  EmptyState,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import type { AdditionalFee } from "../../../types";
import { withProviders } from "../../withProviders";
import { Product } from "../../pages/products/Product";
import { useQuery } from "react-query";
import { orders } from "@wix/ecom";
import { collections } from "@wix/stores";

const OrdersPlugin: FC = () => {
  const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();
    const [siteCollections, setSiteCollections] = useState<collections.Collection[]>();
  
    useEffect(()=>{
      async function getCollections() {
        const response = await collections.queryCollections().find();
        setSiteCollections(response.items)
      }
      getCollections();
    })

  

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Orders Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          
          <Layout>
            {JSON.stringify(siteCollections)}
            
          </Layout>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default withProviders(OrdersPlugin);