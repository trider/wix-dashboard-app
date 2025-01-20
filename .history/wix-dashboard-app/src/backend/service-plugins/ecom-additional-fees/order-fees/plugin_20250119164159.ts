
import { additionalFees } from "@wix/ecom/service-plugins";
import { httpClient } from "@wix/essentials";

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;

        const response = await httpClient.fetchWithAuth (`${import.meta.env.BASE_API_URL}/additional-fees/calculateAdditionalFees`, {
                  method: 'POST',
                  body: JSON.stringify({
                    "name": "wrapping",
                    "price": { "amount": "1000.00", "formattedAmount": "1,000.00 ₪" },
                    "providerAppId": "1380b703-ce81-ff05-f115-39571d94dfcd",
                    "priceBeforeTax": {
                      "amount": "1000.00",
                      "formattedAmount": "1,000.00 ₪"
                    },
                    "priceAfterTax": {
                      "amount": "1000.00",
                      "formattedAmount": "1,000.00 ₪"
                    },
                    "lineItemIds": [],
                    "_id": "bfa25fb0-b47c-466d-964f-bb0e3e77710f"
                  })
          })

          return response.json()
     

  //   console.log(request, metadata)
  //   return {
     
  //     additionalFees: [
  //       {
  //         ...request,
  //         code: "subscription-fee",
  //         name: "Subscription Fee",
  //         price: "5",
  //         taxDetails: {
  //           taxable: true,
  //         },
  //       },
  //     ],
  //     currency: "USD",
  //   };
  },
});

