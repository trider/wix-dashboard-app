import React, { type FC } from 'react';
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

interface Props {
  orderId: string;
  onOrderUpdate: () => Promise<void>;
}

const CheckoutPlugin: FC<Props> = ({ orderId, onOrderUpdate }) => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Dashboard Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Text>
            Order Id:{orderId} 
           
          </Text>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default CheckoutPlugin;
