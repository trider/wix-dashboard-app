import React, { type FC, useState } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  WixDesignSystemProvider,
  Text,
  Layout,
  FormField,
  Dropdown,
  Cell,
  Box,
  CustomModalLayout,
  NumberInput,
  InputArea
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';
import { width, height, title } from './modal.json';
import type { AdditionalFee } from '../../../types';

type Props = {
  addAdditionalFee:(item: AdditionalFee) => void;
}


const Modal: FC<Props> = ({addAdditionalFee}) => {
  const [newFee, setNewFee] = useState<Partial<AdditionalFee>>()
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <CustomModalLayout
        width={width}
        maxHeight={height}
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onCloseButtonClick={() => dashboard.closeModal()}
        primaryButtonOnClick={() => {
          dashboard.closeModal()
          addAdditionalFee(newFee as AdditionalFee)
        }}
        secondaryButtonOnClick={() => dashboard.closeModal()}
        title={title}
        subtitle="Use this form to add fees"
        content={
         
          <Layout>
          
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
              onChange={(val) => setNewFee({ ...newFee, description: val.target.value })}
            />
            </FormField>
            </Cell>





          </Layout>
          // <Box direction="vertical" align="center">
            
          // </Box>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
