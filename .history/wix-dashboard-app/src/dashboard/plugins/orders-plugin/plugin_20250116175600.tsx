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
import { collections,  } from "@wix/stores";

const OrdersPlugin: FC = () => {
  const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();
  const [orders, setSiteOrders] = useState<orders.Order[]>();
  
    useEffect(()=>{
      async function getOrders() {
        const response = await collections.queryCollections().find()
        setSiteOrders(response.items)
        
      }
      getOrders();
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