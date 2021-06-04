import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import AvatarInput, { AvatarInputProps } from "./AvatarInput";
import { Box } from "@chakra-ui/layout";

export default {
  title: "Input/" + AvatarInput.displayName,
  component: AvatarInput,
  decorators: [
    (Story) => (
      <Box bg="rgb(36,36,36)" p="2">
        <Story />
      </Box>
    ),
  ],
} as Meta<AvatarInputProps>;

export const Usage: Story<AvatarInputProps> = (args) => {
  const [src, setSrc] = useState<string>();
  return <AvatarInput value={src} onChange={setSrc} />;
};
