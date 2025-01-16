import React, { type FC } from 'react';
import { dashboard } from '@wix/dashboard';
import {
  WixDesignSystemProvider,
  Text,
  Box,
  CustomModalLayout,
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
          <Box direction="vertical" align="center">
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
            
          </Box>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
