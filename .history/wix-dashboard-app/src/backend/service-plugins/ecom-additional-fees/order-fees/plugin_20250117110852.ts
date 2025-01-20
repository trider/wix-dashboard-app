import { additionalFees } from '@wix/ecom/service-plugins';
import { auth } from '@wix/essentials';

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    alert('fees')
    console.log('fees')
    return {
      additionalFees: [],
      
    };
  },
});
