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
  Button,
  Box,
  CustomModalLayout,
  InputArea,
  NumberInput,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";

import { additionalFees } from "@wix/ecom/service-plugins";
import { withProviders } from "../../withProviders";
import { Product } from "../../pages/products/Product";
import { useQuery } from "react-query";
import { orders } from "@wix/ecom";
import { collections } from "@wix/stores";
import { dashboard } from "@wix/dashboard";
import type { AdditionalFee } from "../../../types";


const OrdersPlugin: FC = () => {
  const [currentOrder, setCurrentOrder] = useState<orders.Order>();
  const [siteCollections, setSiteCollections] = useState<orders.Order[]>();
   const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();

  useEffect(() => {
    async function getCollections() {
      const response = await orders.searchOrders({});
      setSiteCollections(response.orders);
    }
    getCollections();
  });

  const getRowValues = (row: any) => {
    const objectArray = Object.entries(row.data);
    let data: any = [];
    objectArray.forEach(([key, value]) => {
      data.push({ key: key, value: JSON.stringify(value) });
    });
    return data;
  };

  const getTable = () => {
    return (
      <table>
        <tbody>
          {getRowValues(currentOrder).map((item: any) => (
            <tr key={item.name}>
              <td>{item.key}</td>
              <td>
                <span>{item.value}</span>
              </td>
            </tr>
          ))}
          <tr>
            <Button
              onClick={() => {
                dashboard.openModal(
                  "b2826c4d-a44a-414e-84cc-5f48d37599ee",
                  currentOrder
                );
              }}
            >
              Add fee
            </Button>
          </tr>
        </tbody>
      </table>
    );
  };

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
                  options={siteCollections?.map((order) => {
                    return {
                      id: order.number!.toString(),
                      value: order.number!.toString(),
                      data: order,
                    };
                  })}
                  placeholder="Choose an order"
                  onSelect={(order: any) => setCurrentOrder(order)}
                />
              </FormField>
            </Cell>
            {currentOrder && (
              <Layout>
                <Cell>
                  <FormField label="Order">
                    <Input value={currentOrder.number} />
                  </FormField>
                </Cell>
                <Cell span={6}>
                  <FormField label="Name">
                    <Input
                      value={newFee?.name!}
                      onChange={(val) =>
                        setNewFee({ ...newFee, name: val.target.value })
                      }
                    />
                  </FormField>
                </Cell>
                <Cell span={6}>
                  <FormField label="Additional Fee">
                    <NumberInput
                      hideStepper
                      value={newFee?.price}
                      min={0}
                      onChange={(val) =>
                        setNewFee({ ...newFee, price: `${val}` })
                      }
                    />
                  </FormField>
                </Cell>
                <Cell>
                  <FormField label="Description">
                    <InputArea
                      value={newFee?.description}
                      onChange={(val) =>
                        setNewFee({ ...newFee, description: val.target.value })
                      }
                    />
                  </FormField>
                </Cell>
              </Layout>
            )}
          </Layout>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default withProviders(OrdersPlugin);
