import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import SettingInput, { SettingInputProps, Setting } from "./SettingInput";

export default {
  title: "Molecules/" + SettingInput.displayName,
  component: SettingInput,
} as Meta<SettingInputProps>;

export const Usage: Story<SettingInputProps> = (args) => {
  const [setting, setSetting] = useState<Setting>({
    font: "Noto Sans JP",
    enabledBio: true,
    bioIcon: "none",
  });
  return <SettingInput value={setting} onChange={setSetting} />;
};
