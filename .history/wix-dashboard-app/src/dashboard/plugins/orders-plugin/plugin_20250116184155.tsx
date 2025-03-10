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
    
    const [currentOrder, setCurrentOrder] = useState<orders.Order>();
    const [siteCollections, setSiteCollections] = useState<orders.Order[]>();
    
      useEffect(()=>{
        async function getCollections() {
          const response = await orders.searchOrders({});
          setSiteCollections(response.orders)
        }
        getCollections();
      })



    const getRowValues = (row:any) => {
      const objectArray = Object.entries(row);
      let data:any = []
      objectArray.forEach(([key, value]) => {
        data.push({key:key, value:JSON.stringify(value)})
      });
      return data

  }



      

  

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Orders Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Layout gap="24px">
            <Cell>
              <FormField label="Orders">
                <Dropdown
            
                  options={siteCollections?.map(order =>{
                    return {
                      id:order.number!.toString(),
                      value:order.number!.toString(),
                      data:order
                    }
                  })}
                  placeholder="Choose an order"
                  onSelect={(order:any) =>
                    setCurrentOrder(order)
                  }
                  
                  
                />
              </FormField>
            </Cell>
            {currentOrder && (
                  <table>
               
                  <tbody >
                  {getRowValues(currentOrder).map((item:any) => (
                  <tr key={item.id}>
                    
                      <td >{item.key}</td>
                      <td >
                        <span>{item.value}</span>
                      </td>
                   
                  </tr>
                ))}
                    
                  </tbody>
      
                  </table>
              )}
          </Layout>
          
           
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default withProviders(OrdersPlugin);