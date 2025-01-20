
import { additionalFees } from "@wix/ecom/service-plugins";
import { auth } from "@wix/essentials";
import { products } from "@wix/stores";
import { additionalFees as DB } from "../../../../consts";

additionalFees.provideHandlers({
  calculateAdditionalFees: async (payload) => {
    const { request, metadata } = payload;
    const elevatedQueryProducts = auth.elevate(products.queryProducts);
    const itemIds = request.lineItems?.map(item => item.catalogReference?.catalogItemId);
    const productsResponse = await elevatedQueryProducts().in('_id', itemIds).find();
    const collectionIds = productsResponse.items.map(item => item.collectionIds?.[0]);
    const fees = DB.filter(fee => collectionIds.includes(fee.collectionId));

    return {
      additionalFees: fees
    } as additionalFees.CalculateAdditionalFeesResponse;
  },
});


