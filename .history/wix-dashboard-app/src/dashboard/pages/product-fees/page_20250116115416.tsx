import React, { type FC, useState } from "react";
import { dashboard } from "@wix/dashboard";
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  Table,
  WixDesignSystemProvider,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import * as Icons from "@wix/wix-ui-icons-common";
import type { AdditionalFee } from "../../../types";
import { CollectionPage } from "@wix/patterns/page";
import {
  PrimaryActions,
  useOptimisticActions,
  useTableCollection,
} from "@wix/patterns";
import { WixPatternsProvider } from "@wix/patterns/provider";
import { additionalFees } from "../../../consts";

const FeesTable: FC = () => {
  // AdditionalFee
  const state = useTableCollection({
    queryName: "fees-table",
    fetchData: async () => {
      return {
        items: additionalFees,
        total: addAdditionalFee.length,
      };
    },
  });

  const actions = useOptimisticActions(state.collection);

  const addAdditionalFee = (fee: AdditionalFee) => {
    console.log(fee);
    actions.createOne(fee);
    addAdditionalFees.push(fee);
  };

  return (
    <CollectionPage>
      <CollectionPage.Header
        title={{ text: "Additional Fees" }}
        primaryAction={
          <PrimaryActions
            label="Add Fee"
            onClick={() =>
              dashboard.openModal("428ff0c5-d33d-4b1f-b218-9ec9fb1e636f", {
                addAdditionalFee,
              })
            }
          />
        }
      />

      <CollectionPage.Content>
        <Table
          state={state}
          columns={[
            { title: "Name", id: "name", render: (fee) => fee.name },

            {
              title: "Description",
              id: "description",
              render: (fee) => fee.description,
            },
            {
              title: "Collection",
              id: "collection",
              render: (fee) => "Collection",
            },
            {
              title: "Price",
              id: "price",
              render: (fee) => `${fee.price}`,
            },
            {
              title: "# of Products",
              id: "products",
              render: (fee) => 0,
            },
          ]}
        ></Table>
      </CollectionPage.Content>
    </CollectionPage>
  );
};

const Index: FC = () => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <WixPatternsProvider>
        <FeesTable />
      </WixPatternsProvider>
    </WixDesignSystemProvider>
  );
};

export default Index;
