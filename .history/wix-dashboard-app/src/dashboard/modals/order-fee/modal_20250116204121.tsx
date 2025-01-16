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
  Button
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { width, height, title } from "./modal.json";
import { orders } from "@wix/ecom";
import type { AdditionalFee } from "../../../types";
import { additionalFees } from "@wix/ecom/service-plugins";


type Props = {
  addAdditionalFee: (item: AdditionalFee) => void;
};

const Modal: FC = (Props) => {
  const orderData: any = Props;
  // const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();
  const [feeName, setFeeName] = useState('PackingFee')
  const [feeAmount, setFeeAmount] = useState(10)
  const [feeDescription, setFeeDescription] = useState('Description of fee')
  


  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => dashboard.closeModal()}
        primaryButtonOnClick={() => {
          alert(JSON.stringify({
            name:{feeName},
            amount:{feeAmount},
            description:feeDescription
          }))
          dashboard.closeModal()
        }}
        secondaryButtonOnClick={() => dashboard.closeModal()}
        title={title}
        subtitle="Edit this file to customize your modal"
        content={
          <Layout>
            {/* <Cell>
              <FormField label="Order">
                <Input value={orderData.data.number.toString()} />
              </FormField>
            </Cell> */}
            <Cell span={6}>
              <FormField label="Name">
                <Input
                  value={feeName}
                  onChange={(e) =>
                    setFeeName(e.target.value)
                  }
                />
              </FormField>
            </Cell>
            <Cell span={6}>
              <FormField label="Additional Fee">
                <Input
                  value={feeAmount}
                  
                  
                />
              </FormField>
            </Cell>
            <Cell>
              <FormField label="Description">
                <InputArea
                value={feeDescription}
                  
                />
              </FormField>
            </Cell>

          </Layout>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
