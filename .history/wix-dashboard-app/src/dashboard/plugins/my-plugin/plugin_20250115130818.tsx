import React, { type FC } from 'react';
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const pluginId = "5f3929b4-91f3-4900-bfc5-e10fdaac3242";


interface Props {
  staffResourceId: string;
  scheduleId: string;
  timezone: string;
}

const Plugin: FC<Props> = ({ staffResourceId, scheduleId, timezone }) => {
  return (
    <WixDesignSystemProvider features={{ newColorsBranding: true }}>
      <Card>
        <Card.Header title="Dashboard Plugin" />
        <Card.Divider />
        <Card.Content size="medium">
          <Text>
           ID:{staffResourceId}<br/>


            This dashboard plugin was generated with Wix CLI. Customize it according to your logic. To learn more, read our{' '}
            <TextButton as="a" href="https://wix.to/dFFuEki" target="_blank">
              documentation
            </TextButton>
            
            .
          </Text>
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default Plugin;
