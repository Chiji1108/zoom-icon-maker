import { Story, Meta } from "@storybook/react";
import { useState } from "react";
import ImageEditor, { ImageEditorProps } from "./ImageEditor";

export default {
  title: ImageEditor.name,
  component: ImageEditor,
} as Meta;

const Template: Story<ImageEditorProps> = (args) => {
  const [img, setImg] = useState<string>(null);
  return (
    <>
      <ImageEditor onComplate={(i) => setImg(i)} {...args} />
      <img src={img} alt="" />
    </>
  );
};

export const withImgTag = Template.bind({});
withImgTag.args = {
  originalImage:
    "https://img.huffingtonpost.com/asset/5ab4d4ac2000007d06eb2c56.jpeg?cache=sih0jwle4e&ops=1910_1000",
  onError: (e) => console.log(e),
};
