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

// To open your modal, call `openModal` with your modal id.
// e.g.
// import { dashboard } from '@wix/dashboard';
// function MyComponent() {
//   return <button onClick={() => dashboard.openModal('b2826c4d-a44a-414e-84cc-5f48d37599ee')}>Open Modal</button>;
// }
const Modal: FC = () => {
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
            <Text>Wix CLI Modal</Text>
          </Box>
        }
      />
    </WixDesignSystemProvider>
  );
};

export default Modal;
