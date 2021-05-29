import { Story, Meta } from "@storybook/react";
import ImageSelector, { ImageSelectorProps } from "./ImageSelector";
import { action } from "@storybook/addon-actions";
import { useState } from "react";

export default {
  title: "Atoms/" + ImageSelector.displayName,
  component: ImageSelector,
  args: {
    onSelect: action("onSelect"),
  },
} as Meta<ImageSelectorProps>;

export const Usage: Story<ImageSelectorProps> = (args) => {
  return <ImageSelector {...args} />;
};

export const Selected: Story<ImageSelectorProps> = (args) => (
  <ImageSelector
    {...args}
    previewSrc="https://source.unsplash.com/random/512x512"
  />
);
