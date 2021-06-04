import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import ImageEditor, { ImageEditorProps } from "./ImageEditor";

export default {
  title: "Utils/" + ImageEditor.displayName,
  component: ImageEditor,
  args: {
    src: "https://source.unsplash.com/daily",
    onComplete: action("onComplete"),
  },
} as Meta<ImageEditorProps>;

export const Usage: Story<ImageEditorProps> = ({ ...args }) => {
  return <ImageEditor {...args} />;
};
