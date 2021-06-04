import { Box } from "@chakra-ui/layout";
import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import TwitterInput, { TwitterInputProps } from "./TwitterInput";

//TODO: use msw to no use Environment Variable

export default {
  title: "Input/" + TwitterInput.displayName,
  component: TwitterInput,
  args: {
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <Box bg="rgb(36,36,36)" p="2">
        <Story />
      </Box>
    ),
  ],
} as Meta<TwitterInputProps>;

export const Usage: Story<TwitterInputProps> = (args) => (
  <TwitterInput {...args} />
);
