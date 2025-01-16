import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WixStyleReactProvider } from "@wix/design-system";

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
