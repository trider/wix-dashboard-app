import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {WixStyleReactProvider, Button} from 'wix-style-react';

export function withProviders(Component: React.ComponentType) {
  return function () {
    return (
      <WixStyleReactProvider>
        <QueryClientProvider client={new QueryClient()}>
          <Component />
        </QueryClientProvider>
      </WixStyleReactProvider>
    );
  };
}
