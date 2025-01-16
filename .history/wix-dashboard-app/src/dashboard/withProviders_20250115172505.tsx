import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { WixDesignSystemProvider } from "@wix/design-system";
import { WixPatternsProvider } from "@wix/patterns/provider";
import { withDashboard } from "@wix/dashboard";



export function withProviders<P extends {} = {}>(Component: React.FC<P>) {
  return withDashboard(function DashboardProviders(props: P) {
    return (
      <WixDesignSystemProvider>
        <QueryClientProvider client={new QueryClient()}>
        <WixPatternsProvider>
          <Component {...props} />
        </WixPatternsProvider>
      
        </QueryClientProvider>
        
      </WixDesignSystemProvider>
    );
  });
}



// export function withProviders(Component: React.ComponentType) {
//   return function () {
//     return (
//       <WixDesignSystemProvider>
//         <QueryClientProvider client={new QueryClient()}>
//           <Component />
//         </QueryClientProvider>
//       </WixDesignSystemProvider>
//     );
//   };
// }
