import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import ImageEditor, { ImageEditorProps } from "./ImageEditor";
import { action } from "@storybook/addon-actions";

export default {
  title: ImageEditor.name,
  component: ImageEditor,
  args: {
    onComplete: (image) => action("onComplete")(image),
    onError: (error) => action("onError")(error),
    src: "https://source.unsplash.com/daily",
  },
} as Meta;

export const Usage: Story<ImageEditorProps> = ({ ...args }) => (
  <ImageEditor {...args} />
);

export const UsageWithOutput: Story<ImageEditorProps> = ({
  onComplete,
  ...args
}) => {
  const [img, setImg] = useState<string>(null);
  return (
    <>
      <ImageEditor onComplete={(i) => setImg(i)} {...args} />
      <img src={img} alt="result" className="rounded-full overflow-hidden" />
    </>
  );
};
