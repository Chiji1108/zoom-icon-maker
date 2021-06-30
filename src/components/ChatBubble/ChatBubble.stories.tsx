import { Story, Meta } from "@storybook/react";
import { ChatBubble, ChatBubbleProps } from "./ChatBubble";

export default {
  title: ChatBubble.displayName,
  component: ChatBubble,
  args: {
    icon: "/about/nuko.png",
    children: "hoge",
  },
} as Meta<ChatBubbleProps>;

export const Usage: Story<ChatBubbleProps> = (args) => <ChatBubble {...args} />;
