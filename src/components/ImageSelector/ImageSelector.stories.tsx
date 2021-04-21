import { Story, Meta } from "@storybook/react";
import ImageSelector, { ImageSelectorProps } from "./ImageSelector";

export default {
  title: ImageSelector.name,
  component: ImageSelector,
} as Meta;

const Template: Story<ImageSelectorProps> = (args) => (
  <ImageSelector {...args} />
);

export const NotSelected = Template.bind({});
NotSelected.args = {
  onSelect: (image) => console.log(image),
};

export const Selected = Template.bind({});
Selected.args = {
  currentImage: "https://source.unsplash.com/random/512x512",
  onSelect: (image) => console.log(image),
};
