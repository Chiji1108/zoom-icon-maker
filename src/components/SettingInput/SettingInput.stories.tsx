import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import SettingInput, { SettingInputProps } from "./SettingInput";

export default {
  title: "Molecules/" + SettingInput.displayName,
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
} as Meta<SettingInputProps>;

export const Usage: Story<SettingInputProps> = (args) => {
  return <SettingInput {...args} />;
};

export const Advanced: Story<SettingInputProps> = (args) => {
  return <SettingInput {...args} advanced />;
};
