import React, { type FC, useState, useEffect } from 'react';
import { widget } from '@wix/editor';
import {
  SidePanel,
  WixDesignSystemProvider,
  Input,
  FormField,
  Button,
  EmptyState,
  Image,
  Page,
  TextButton,
} from '@wix/design-system';
import '@wix/design-system/styles.global.css';

const Panel: FC = () => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    widget.getProp('display-name').then(name => setName(name || 'Wix CLI'));
  }, [setName]);

  return (
    <WixDesignSystemProvider>
      <SidePanel width="300">
        <SidePanel.Content noPadding stretchVertically>
          <SidePanel.Field>
            <FormField label="Your name">
              <Input
                type="text"
                value={name}
                onChange={(event) => {
                  const newName = event.target.value;
                  setName(newName);
                  widget.setProp('display-name', newName);
                }}
              />
            </FormField>
            <Button
              onClick={() => {
                dashboard.showToast({
                  message: 'Your second toast message!',
                });
              }}
              prefixIcon={<Icons.GetStarted />}
            >
              Show a toast
            </Button>
          </SidePanel.Field>
        </SidePanel.Content>
      </SidePanel>
    </WixDesignSystemProvider>
  );
};

export default Panel;
