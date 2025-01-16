import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WixDesignSystemProvider } from "@wix/design-system";
import { WixPatternsProvider } from "@wix/patterns/provider";


export function withProviders(Component: React.ComponentType) {
  return function () {
    return (
      <WixDesignSystemProvider>
        <QueryClientProvider client={new QueryClient()}>
          <Component />
        </QueryClientProvider>
      </WixDesignSystemProvider>
    );
  };
}
