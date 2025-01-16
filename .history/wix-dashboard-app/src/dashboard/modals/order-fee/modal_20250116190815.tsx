import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
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
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { width, height, title } from './modal.json';
import { orders } from "@wix/ecom";


type Props = {
  order: (item: orders.Order) => void;
};

const Modal: FC = (Props) => {


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
                {JSON.stringify(Props)}
            
                {/* <FormField label="Name">
                  <Input
                    
                    
                  />
                </FormField> */}

              </Cell>

            </Layout>
          // <Box direction="vertical" align="center">
          //   <Text>{JSON.stringify(Props)}</Text>
          // </Box>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
