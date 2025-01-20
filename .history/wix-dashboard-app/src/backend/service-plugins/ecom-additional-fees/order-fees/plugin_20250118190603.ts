import { additionalFees } from '@wix/ecom/service-plugins';

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {

    console.log(fees)
    return {
      additionalFees: [],
    };
  },
});
