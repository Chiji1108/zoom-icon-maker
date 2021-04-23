import { Story, Meta } from "@storybook/react";
import ImageSelector, { ImageSelectorProps } from "./ImageSelector";
import { action } from "@storybook/addon-actions";

export default {
  title: ImageSelector.name,
  component: ImageSelector,
  args: {
    onSelect: (image) => action("onSelect")(image),
  },
} as Meta;

export const Usage: Story<ImageSelectorProps> = (args) => (
  <ImageSelector {...args} />
);

export const Selected: Story<ImageSelectorProps> = (args) => (
  <ImageSelector
    {...args}
    currentImage="https://source.unsplash.com/random/512x512"
  />
);
