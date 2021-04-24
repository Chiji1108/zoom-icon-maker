import { Story, Meta } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import ImageEditor, { ImageEditorProps } from "./ImageEditor";
import { action } from "@storybook/addon-actions";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { generateStart, selectImageEditor } from "./imageEditorSlice";
import { LoadableButton } from "../LoadableButton";

export default {
  title: ImageEditor.name,
  component: ImageEditor,
  args: {
    src: "https://source.unsplash.com/daily",
  },
} as Meta;

export const Usage: Story<ImageEditorProps> = ({ ...args }) => (
  <ImageEditor {...args} />
);

export const UsageWithOutput: Story<ImageEditorProps> = ({ ...args }) => {
  const dispatch = useAppDispatch();
  const { croppedSrc, loading } = useAppSelector(selectImageEditor);
  return (
    <>
      <ImageEditor {...args} />
      <LoadableButton
        loading={loading}
        onClick={() => dispatch(generateStart())}
      >
        Apply
      </LoadableButton>
      <img
        src={croppedSrc}
        alt="result"
        className="rounded-full overflow-hidden"
      />
    </>
  );
};
