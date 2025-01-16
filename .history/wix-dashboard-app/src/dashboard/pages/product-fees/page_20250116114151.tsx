import React, { type FC } from "react";
import { dashboard } from "@wix/dashboard";
import {
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
  WixDesignSystemProvider,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import * as Icons from "@wix/wix-ui-icons-common";
import type { AdditionalFee } from "../../../types";
import { CollectionPage } from "@wix/patterns/page";
import { PrimaryActions, useTableCollection } from "@wix/patterns";
import { WixPatternsProvider } from "@wix/patterns/provider";


const FeesTable: FC = () => {

  const state = useTableCollection<AdditionalFee>({
    queryName: 'fees-table',
    fetchData: async () => {
      return {
        items: [],
        total: 0
      };
    },
    itemKey: function (item: AdditionalFee): string {
      throw new Error("Function not implemented.");
    }
  });

  const addAdditionalFee = (fee: AdditionalFee) => {
    console.log(fee);
  };

 

  return (
    <CollectionPage>
      <CollectionPage.Header
        title={{ text: "Additional Fees" }}
        primaryAction={
          <PrimaryActions
            label="Add Fee"
            onClick={() =>
                dashboard.openModal('428ff0c5-d33d-4b1f-b218-9ec9fb1e636f', {
                addAdditionalFee,
              })
            }
          />
        }
      />

      <CollectionPage.Content>
        <div>Hello</div>
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
