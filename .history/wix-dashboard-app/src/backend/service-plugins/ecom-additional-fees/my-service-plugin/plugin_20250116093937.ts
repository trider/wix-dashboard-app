import { additionalFees } from "@wix/ecom/service-plugins";

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;

    
    
    const additionalFees = fetch('https://my-additional-fees-app.com/',{})
    // Use the `request` and `metadata` received from Wix and
    // apply custom logic.
    return {
      // Return your response exactly as documented to integrate with Wix.
      // Return value example:
      additionalFees: [
        {
          code: "subscription-fee",
          name: "Subscription Fee",
          price: "5",
          taxDetails: {
            taxable: true,
          },
        },
      ],
      currency: "USD",
    };
  },
});



