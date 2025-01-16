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
  const [siteCollections, setSiteCollections] =
    useState<collections.Collection[]>();

  useEffect(() => {
    async function getCollections() {
      const response = await collections.queryCollections().find();
      setSiteCollections(response.items);
    }
    getCollections();
  });

  const getRowValues = (row: any) => {
    const objectArray = Object.entries(row);
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
              {JSON.stringify(getRowValues(siteCollections))}
              {/* <table>
                <tbody>
                  {getRowValues(siteCollections).map((item: any) => (
                    <tr key={item.id}>
                      <td>{item.key}</td>
                      <td>
                        <span
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                          }}
                        >
                          {item.value}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </Cell>

            <Cell>
              <Layout gap="24px">
                <Cell>
                  <FormField label="Collection">
                    <Dropdown
                      options={siteCollections?.map((collection) => {
                        return {
                          id: collection._id!,
                          value: collection.name,
                        };
                      })}
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
