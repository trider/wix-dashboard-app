import React, { type FC } from "react";
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

// type Props = {
//   order: (item: orders.Order) => void;
// };

const Modal: FC = (Props) => {
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
              <FormField label="Name">
                <Input
                  value={Props.data.number.toString()}
                  
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
