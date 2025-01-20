import { additionalFees } from '@wix/ecom/service-plugins/context';

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    
    const additionalFees = await fetch(
      `https://my-additional-fees-app.com/additional-fees`,{
        body:JSON.stringify({
          additionalFees:request.purchaseFlowId
        })
      }
    ).then((res) => {
      alert(res.json)
      return res.json()

    })


    return {
      additionalFees: additionalFees,
    };
  },
});
