import React, { type FC, useState } from "react";
import { dashboard } from "@wix/dashboard";
import {
  WixDesignSystemProvider,
  Text,
  Layout,
  FormField,
  Dropdown,
  Cell,
  Input,
  Box,
  CustomModalLayout,
  InputArea,
  NumberInput,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { width, height, title } from "./modal.json";
import { orders } from "@wix/ecom";
import type { AdditionalFee } from "../../../types";
import { additionalFees } from "@wix/ecom/service-plugins";

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;

    // Add your logic here

    return {
      additionalFees: [
        {
          name: "Sample Fee",
          amount: 10,
          currency: "USD",
        },
      ],
    };
  },
});

// type Props = {
//   order: (item: orders.Order) => void;
// };

type Props = {
  addAdditionalFee: (item: AdditionalFee) => void;
};

const Modal: FC = (Props) => {
  const orderData: any = Props;
  const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();

  const getRowValues = (row: any) => {
    const objectArray = Object.entries(row.data.additionalFees);
    let data: any = [];
    objectArray.forEach(([key, value]) => {
      data.push({ key: key, value: JSON.stringify(value) });
    });
    return data;
  };

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => dashboard.closeModal()}
        primaryButtonOnClick={() => dashboard.closeModal()}
        secondaryButtonOnClick={() => dashboard.closeModal()}
        title={title}
        subtitle="Edit this file to customize your modal"
        content={
          <Layout>
            <Cell>
              <FormField label="Order">
                <Input value={orderData.data.number.toString()} />
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
                  onChange={(val) => setNewFee({ ...newFee, price: `${val}` })}
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
            <Cell>
              <table>
                <tbody>
                  {getRowValues(Props).map((item: any) => (
                    <tr key={item.name}>
                      <td>{item.key}</td>
                      <td>
                        <span>{item.value}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Cell>
          </Layout>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
