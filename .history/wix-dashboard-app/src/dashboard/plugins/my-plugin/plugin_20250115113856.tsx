import React, { type FC } from 'react';
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';


interface Props {
  productId: string;
}

const CheckoutPlugin: FC<Props> = ({ productId }) => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Dashboard Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Text>ID:{productId}<br/></Text>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default CheckoutPlugin;
