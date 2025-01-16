import { collections } from '@wix/stores'

export type ChatMessage = {
 text: string;
 author: "Business Buddy" | "User";
};


export type AdditionalFee = {
 name:string;
 description:string;
 price:string;
 collectionId?:string;
 collection?:collections.Collection;
}