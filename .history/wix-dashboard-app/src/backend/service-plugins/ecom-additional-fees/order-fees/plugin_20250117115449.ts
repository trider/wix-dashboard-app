import { additionalFees } from '@wix/ecom/service-plugins';

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    
    const additionalFees = await fetch(
      `${import.meta.env.BASE_API_URL}/additional-fees`,{
        body:JSON.stringify({
          additionalFees:request.purchaseFlowId
        })
      }
    )


    return {
      additionalFees: [],
    };
  },
});
