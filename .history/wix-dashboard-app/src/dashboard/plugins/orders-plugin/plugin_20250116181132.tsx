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
  FormField,
  Dropdown,
  Input,
  Box,
  CustomModalLayout,
  InputArea,
  NumberInput,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import type { AdditionalFee } from "../../../types";
import { withProviders } from "../../withProviders";
import { Product } from "../../pages/products/Product";
import { useQuery } from "react-query";
import { orders } from "@wix/ecom";
import { collections,  } from "@wix/stores";

const OrdersPlugin: FC = () => {
    
    const [siteCollections, setSiteCollections] = useState<collections.Collection[]>();
    
      useEffect(()=>{
        async function getCollections() {
          const response = await orders.searchOrders({});
          setSiteCollections(response.orders)
        }
        getCollections();
      })

      

  

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Orders Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Layout gap="24px">
                          <Cell>
                            <FormField label="Collection">
                              <Dropdown
                         
                                options={siteCollections?.map(collection =>{
                                  return {
                                    id:collection._id!,
                                    value:collection.name
                                  }
                                })}
                               
                              />
                            </FormField>
                          </Cell>
                        </Layout>
          
           
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default withProviders(OrdersPlugin);