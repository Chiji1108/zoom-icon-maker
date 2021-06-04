import { action } from "@storybook/addon-actions";
import { Meta, Story } from "@storybook/react";
import TwitterInput, { TwitterInputProps } from "./TwitterInput";

export default {
  title: TwitterInput.displayName,
  component: TwitterInput,
  args: {
    onChange: action("onChange"),
  },
} as Meta<TwitterInputProps>;

export const Usage: Story<TwitterInputProps> = (args) => (
  <TwitterInput {...args} />
);
