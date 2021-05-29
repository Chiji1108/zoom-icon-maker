import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import AvatarInput, { AvatarInputProps } from "./AvatarInput";

export default {
  title: "Molecules/" + AvatarInput.displayName,
  component: AvatarInput,
} as Meta<AvatarInputProps>;

export const Usage: Story<AvatarInputProps> = (args) => {
  const [src, setSrc] = useState<string>();
  return <AvatarInput value={src} onChange={setSrc} />;
};
