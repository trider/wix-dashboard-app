import { additionalFees } from '@wix/ecom/service-plugins';
import { httpClient, auth } from "@wix/essentials";

additionalFees.provideHandlers({
  calculateAdditionalFees: async ({ request, metadata }) => {
    const response = await httpClient.fetchWithAuth(`${import.meta.env.BASE_API_URL}/additional-fees`).then(data =>{
      alert (JSON.stringify(data))
    })
    
    console.log(response.json())
    return {
      additionalFees: [],
      
    };
  },
});
