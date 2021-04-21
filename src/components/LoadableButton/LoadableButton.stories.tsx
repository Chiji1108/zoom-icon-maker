import { Story, Meta } from "@storybook/react";
import LoadableButton, { LoadableButtonProps } from "./LoadableButton";

export default {
  title: LoadableButton.name,
  component: LoadableButton,
  argTypes: {
    loadingText: { control: { type: "text" } },
  },
} as Meta;

const Template: Story<LoadableButtonProps> = (args) => (
  <LoadableButton {...args} />
);

export const NotLoading = Template.bind({});
NotLoading.args = {
  children: "HogeHoge",
  loading: false,
};

export const Loading = Template.bind({});
Loading.args = {
  children: "HogeHoge",
  loading: true,
};
