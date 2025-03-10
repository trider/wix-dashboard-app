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
import wixLogo from "../wix_logo.svg";

import Plugin from "../../plugins/my-plugin/plugin";
import ProductsPlugin from "../../plugins/products-plugin/plugin";
import ProductPackagingFeesPlugin from "../../plugins/product-packaging-fee/plugin";
import type { AdditionalFee } from "../../../types";
import { CollectionPage } from "@wix/patterns/page";
import { PrimaryActions, useTableCollection } from "@wix/patterns";
import { WixPatternsProvider } from "@wix/patterns/provider";

const FeesTable: FC = () => {
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
              dashboard.openModal("d6cdf4a9-71e0-4af8-aedb-eaec5d32d281", {
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
