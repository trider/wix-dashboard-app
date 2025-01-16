import React, { useCallback, useState, type FC } from "react";
import { products } from "@wix/stores";
import { httpClient } from "@wix/essentials";
import { Text, Box, Card, Input, Loader } from "@wix/design-system";
import * as Icons from "@wix/wix-ui-icons-common";
import type { ChatMessage } from "../../../types";
import styles from "./ProductChat.module.css";

async function submitProductChatMessage(
  messages: ChatMessage[],
  product: products.Product
) {
  const response = await httpClient.fetchWithAuth(
    `${import.meta.env.BASE_API_URL}/chat`,
    {
      method: "POST",
      body: JSON.stringify({
        messages,
        product,
      }),
    }
  );
  const message = await response.json();

  return message;
}

export const ProductDetails: FC<{ product: products.Product }> = ({
  product,
}) => {
  const [isWaitingForReply, setIsWaitingForReply] = useState<boolean>(false);
  const [messageDraft, setMessageDraft] = useState<string>();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const submitMessage = useCallback(async () => {
    const newMessage: ChatMessage = {
      text: messageDraft ?? "",
      author: "User",
    };
    const messages = chatMessages.concat(newMessage);

    setChatMessages((state) => state.concat(newMessage));
    setMessageDraft("");
    setIsWaitingForReply(true);

    const { message: text } = await submitProductChatMessage(messages, product);

    setChatMessages((messages) =>
      messages.concat({
        author: "Business Buddy",
        text,
      })
    );
    setIsWaitingForReply(false);
  }, [chatMessages, messageDraft, product]);

  const getRowValues = (row: any) => {
    const objectArray = Object.entries(row);
    let data: any = [];
    objectArray.forEach(([key, value]) => {
      data.push({ key: key, value: JSON.stringify(value) });
    });
    return data;
  };

  return (
    <Card>
      <Card.Header
        title={`Details: ${product.slug}`}
        subtitle={`SKU: ${product.sku}`}
      />
      <Card.Divider />
      <Card.Content >
        <Box>
          <Text tabName="p">{product.description}</Text>
        </Box>
      
      </Card.Content>
    </Card>
  );
};
