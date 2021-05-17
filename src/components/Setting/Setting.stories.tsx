import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/react";
import Setting, { SettingProps, SettingValue } from "./Setting";

export default {
  title: "Setting",
  component: Setting,
  args: {
    initialValue: {
      font: null,
      enabledBio: true,
      bioIcon: null,
    },
    onComplete: action("onComplele"),
  },
} as Meta<SettingProps>;

export const Usage: Story<SettingProps> = (args) => <Setting {...args} />;
