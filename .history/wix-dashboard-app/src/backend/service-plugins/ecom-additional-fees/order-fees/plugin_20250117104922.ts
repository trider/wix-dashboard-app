import { additionalFees } from '@wix/ecom/service-plugins';

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    alert('fees')
    return {
      additionalFees: [],
      
    };
  },
});
