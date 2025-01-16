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
         
          <Box direction="vertical" align="center">
            <Text>Wix CLI Modal</Text>
          </Box>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
