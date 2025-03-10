import { Text, Box, Card, Input, Loader } from "@wix/design-system";
import { products } from "@wix/stores";
import React from "react";
import * as Icons from "@wix/wix-ui-icons-common";


type Message = {
  author: "Business Buddy" | "User";
  text: string;
};

export function ProductChat(props: { product: products.Product }) {
  const [isWaitingForBusinessBuddy, setIsWaitingForBusinessBuddy] =
    React.useState(false);
  const [messageDraft, setMessageDraft] = React.useState<string | undefined>(
    undefined,
  );
  const [chatMessages, setChatMessages] = React.useState([] as Message[]);

  return (
    <Card>
      <Card.Header
        title={`Ask Business Buddy about "${props.product.name}"`}
        subtitle={`SKU: ${props.product.sku}`}
      />
      <Card.Content>
        <Box width={"100%"}>
          <Input
            disabled={isWaitingForBusinessBuddy}
            className={styles.userInput}
            suffix={
              <Input.IconAffix>
                <Icons.Send />
              </Input.IconAffix>
            }
            placeholder="Ask Business Buddy something..."
            onChange={(e) => {
              setMessageDraft(e.target.value);
            }}
            value={messageDraft}
          />
        </Box>
        {chatMessages.map((message) => (
          <Box>
            <Text tabName="p">
              <b>{message.author}</b>: {message.text}
            </Text>
          </Box>
        ))}
        {isWaitingForBusinessBuddy && (
          <Box align="center" padding="8px 0px">
            <Loader size="small" />
          </Box>
        )}
      </Card.Content>
    </Card>
  );
}
