import { Story, Meta } from "@storybook/react";
import LoadableButton, { LoadableButtonProps } from "./LoadableButton";

export default {
  title: LoadableButton.displayName,
  component: LoadableButton,
  args: {
    loading: true,
  },
  argTypes: {
    loadingText: { control: { type: "text" } },
  },
} as Meta<LoadableButtonProps>;

export const Loading: Story<LoadableButtonProps> = (args) => (
  <LoadableButton {...args}>HogeHoge</LoadableButton>
);
