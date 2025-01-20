import { additionalFees } from "../../../consts";
import { collections } from "@wix/stores";
import { AdditionalFee } from "../../../types";
import { getAppInstance } from "../../../dashboard/utils";
import { auth } from "@wix/essentials";





const mergeFeesWithCollection = (collections: collections.Collection[])=>{

    return additionalFees.map(fee =>{
      const collection = collections.find(collection => collection._id === fee.collectionId);
      return {
        ...fee,
        collection,
      }
    })

}

export async function GET(req: Request) {
  const collectionIds = additionalFees.map(fee => fee.collectionId);
  const collectionsResponse = await collections.queryCollections().in('_id', collectionIds).find();
  const fees:AdditionalFee[] = mergeFeesWithCollection(collectionsResponse.items);
  
  return Response.json(fees)
  // const data = await req.json();
  // console.log('Log Get', data);
  // return Response.json(data);
  
};

export async function POST(req: Request) {
  const data = await req.json();
  console.log('Log POST with body:', data);
  return Response.json(data);
};
