import React, { type FC } from 'react';
import {
  WixDesignSystemProvider,
  Card,
  Text,
  TextButton,
  Button,
  EmptyState,
  Image,
  Page,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';


interface Props {
  staffResourceId: string;
  scheduleId: string;
  timezone: string;
}

const Plugin: FC<Props> = ({ staffResourceId, scheduleId, timezone }) => {
  return (
    <WixDesignSystemProvider>
      <Card>
        <Card.Header
          title="Page Plugin"
          subtitle={
            <Box direction="horizontal" gap="1">
              <Text secondary>This is your page plugin.</Text>
              <TextButton as="a" href="https://wix.to/JaXp37C" target="_blank">
                Learn more
              </TextButton>
            </Box>
          }
        />
        <Card.Divider />
        <Card.Content size="medium">
          <EmptyState
            theme="section"
            title="Here is some content"
            subtitle="Hello world!"
          />
        </Card.Content>
      </Card>
    </WixDesignSystemProvider>
  );
};

export default Plugin;
