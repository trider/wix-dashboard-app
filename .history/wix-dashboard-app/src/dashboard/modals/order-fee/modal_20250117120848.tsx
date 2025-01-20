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
  Button,
} from "@wix/design-system";
import "@wix/design-system/styles.global.css";
import { width, height, title } from "./modal.json";
import { orders } from "@wix/ecom";
// import type { AdditionalFee } from "../../../types";
import { additionalFees, } from "@wix/ecom/service-plugins";
import { items } from "@wix/data";


// type Props = {
//   addAdditionalFee: (item: AdditionalFee) => void;
// };

const Modal: FC = (Props) => {
  const orderData: any = Props;
  // const [newFee, setNewFee] = useState<Partial<AdditionalFee>>();
  const [feeName, setFeeName] = useState("Packing");
  const [feeAmount, setFeeAmount] = useState(10);
  const [feeDescription, setFeeDescription] = useState("Description of fee");
  
  const fees = additionalFees



  
  

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
            {getRowValues(orderData).map((item: any) => (
              <tr key={item.name}>
                <td>{item.key}</td>
                <td>
                  <span>{item.value}</span>
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
      )
  
    }

    async function saveItem(toSave:any) {
      
      const savedItem = await items.save(orderData.data.number.toString(), toSave);
      console.log(savedItem); // See below
    }

  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => dashboard.closeModal()}
        primaryButtonOnClick={() => {
          const code:string = orderData.data.number.toString()
          const payload:any = {
            code: { code },
            name: { feeName },
            price: { feeAmount },
            description: feeDescription,
          }
          // alert(JSON.stringify(payload));
          orderData.data.additionalFees.push(payload)
         
          alert(JSON.stringify(orderData.data.additionalFees));
       

          const response = orders.updateOrder(orderData.data._id, orderData).then(data =>{
            alert(JSON.stringify(data))
            return data
          })

          alert(JSON.stringify(response))
          
          
          // const savedItem = saveItem(orderData)
          // console.log(savedItem);
          dashboard.closeModal();
        }}
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
                  value={feeName}
                  onChange={(e) => setFeeName(e.target.value)}
                />
              </FormField>
            </Cell>
            <Cell span={6}>
              <FormField label="Additional Fee">
                <Input value={feeAmount} />
              </FormField>
            </Cell>
            <Cell>
              <FormField label="Description">
                <InputArea value={feeDescription} />
              </FormField>
            </Cell>
            {/* {getTable()} */}
          </Layout>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
