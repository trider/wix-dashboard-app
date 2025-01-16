import React, { type FC, useEffect, useState } from "react";
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
import type { AdditionalFee } from "../../../types";
import { collections } from "@wix/stores";

type Props = {
  addAdditionalFee: (item: AdditionalFee) => void;
};

const Modal: FC<Props> = ({ addAdditionalFee }) => {
  const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();
  const [siteCollections, setSiteCollections] = useState<collections.Collection[]>();

  useEffect(()=>{
    async function getCollections() {
      const response = await collections.queryCollections().find();
      setSiteCollections(response.items)
    }
  })


  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => dashboard.closeModal()}
        primaryButtonOnClick={() => {
          dashboard.closeModal();
          addAdditionalFee(newFee as AdditionalFee);
        }}
        secondaryButtonOnClick={() => dashboard.closeModal()}
        title={title}
        subtitle="Use this form to add fees"
        content={
          <Layout>
            <Cell>
              <Layout gap="24px">
                <Cell>
                  <FormField label="Collection">
                    <Dropdown
                      options={[
                        {
                          id: "00000000-000000-000000-000000000001",
                          value: "All Products",
                        },
                      ]}
                      onSelect={(option) =>
                        setNewFee({ ...newFee, collectionId: `${option.id}` })
                      }
                    />
                  </FormField>
                </Cell>
              </Layout>
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
          </Layout>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
