
import { additionalFees } from "@wix/ecom/service-plugins";

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;
     

    console.log(request, metadata)
    return {
     
      additionalFees: [
        {
          ...request,
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

