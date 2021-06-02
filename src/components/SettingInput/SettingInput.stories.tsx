import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import SettingInput, { SettingInputProps, Setting } from "./SettingInput";

export default {
  title: "Molecules/" + SettingInput.displayName,
  component: SettingInput,
  args: {
    onChange: action("onChange"),
  },
} as Meta<SettingInputProps>;

export const Usage: Story<SettingInputProps> = (args) => {
  return <SettingInput {...args} />;
};

export const Advanced: Story<SettingInputProps> = (args) => {
  return <SettingInput {...args} advanced />;
};
