import React, { type FC, useState, useEffect } from "react";
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
import {
  PrimaryActions,
  useOptimisticActions,
  useTableCollection,
  Table
} from "@wix/patterns";
import { WixPatternsProvider } from "@wix/patterns/provider";
import { additionalFees } from "../../../consts";
import { CustomColumns } from "@wix/patterns";
import { httpClient, auth } from "@wix/essentials";
import { products } from "@wix/stores";
import { collections } from "@wix/stores";



const FeesTable: FC = () => {
  // const params = new URLSearchParams(window.location.search).get("instance")!;
  // alert(JSON.stringify(params))

  const [currentProduct, setCurrentProduct] = useState<products.Product>();
  const [siteCollections, setSiteCollections] = useState<collections.Collection[]>();
  
    useEffect(() => {
      async function getCollections() {
        const response = await collections.queryCollections().find();
        setSiteCollections(response.items);
      }
      getCollections();
    });
  
  const tableState = useTableCollection<AdditionalFee>({
    queryName: "fees-table",
    itemKey:(fee)=>fee.name,
    fetchData: async () => {
      
      const response = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/additional-fees`)
      let data = await response.json()
    
      
      return {
        items: data,
        total: data.length,
      };
    },
  });

 

  const actions = useOptimisticActions(tableState.collection);


  const addAdditionalFee = (fee: any) => {
    actions.createOne(fee, {
      submit: async () => {
        additionalFees.push({ ...fee, id: fee.id || Date.now().toString() })
        return[fee]
      },
      successToast:`${fee.name} was added succesfully`
    });
  
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
        <Table state={tableState} customColumns={<CustomColumns/>} columns={[
            { title: "Name", id: "name", render: (fee) => fee.name },
            {
              title: "Description",
              id: "description",
              render: (fee) => fee.description,
            },
            {
              title: "Collection",
              id: "collection",
              render: (fee) => fee.collection,
            },
            {
              title: "Price",
              id: "price",
              render: (fee) => `${fee.price}`,
            },
            {
              title: "# of Products",
              id: "products",
              render: (fee) => fee.collection?.numberOfProducts||0,
            },
          ]}
        />
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
