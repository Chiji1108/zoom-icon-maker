import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import SettingInput, { SettingInputProps } from "./SettingInput";
import { Box } from "@chakra-ui/layout";

export default {
  title: "Input/" + SettingInput.displayName,
  component: SettingInput,
  args: {
    value: {
      text: "Chijidosu",
      setting: {
        font: {
          family: "Noto Sans JP",
          weight: "400",
        },
        icon: "twitter",
        isHidden: false,
      },
    },
    onChange: action("onChange"),
  },
  decorators: [
    (Story) => (
      <Box bg="rgb(36,36,36)" p="2">
        <Story />
      </Box>
    ),
  ],
} as Meta<SettingInputProps>;

export const Usage: Story<SettingInputProps> = (args) => {
  return <SettingInput {...args} />;
};

export const Advanced: Story<SettingInputProps> = (args) => {
  return <SettingInput {...args} advanced />;
};
