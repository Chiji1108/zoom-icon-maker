import { Story, Meta } from "@storybook/react";
import ImageSelector, { ImageSelectorProps } from "./ImageSelector";
import { action } from "@storybook/addon-actions";

export default {
  title: ImageSelector.displayName,
  component: ImageSelector,
  args: {
    src: null,
    onSelect: (image) => action("onSelect")(image),
  },
} as Meta;

export const Usage: Story<ImageSelectorProps> = (args) => (
  <ImageSelector {...args} />
);

export const Selected: Story<ImageSelectorProps> = (args) => (
  <ImageSelector {...args} src="https://source.unsplash.com/random/512x512" />
);
