import { additionalFees } from "../../../consts";
import { collections } from "@wix/stores";
import { AdditionalFee } from "../../../types";

const mergeFeesWithCollection = (collections: collections.Collection[])=>{
  return additionalFees.map(fee =>{
    return additionalFees.map(fee =>{
      const collection = collections.find(collection => collection._id === fee.collectionId);
      return {
        ...fee,
        collection,
      }
    })
  })
}

export async function GET(req: Request) {

  const collectionIds = additionalFees.map(fee => fee.collectionId);
  const collectionsResponse = await collections.queryCollections().in('_id', collectionIds).find();
  // <AdditionalFee>
  const fees = mergeFeesWithCollection(collectionsResponse.items);
  return Response.json(mergeFeesWithCollection(fees)
  
};

export async function POST(req: Request) {
  const data = await req.json();
  console.log('Log POST with body:', data);
  return Response.json(data);
};
