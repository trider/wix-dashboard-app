import { additionalFees } from "@wix/ecom/service-plugins";

export default additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;
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


