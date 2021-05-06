import { Story, Meta } from "@storybook/react";
import { useRef } from "react";
import ImageEditor, {
  ImageEditorHandler,
  ImageEditorProps,
} from "./ImageEditor";
import { useAppSelector } from "../../app/hooks";
import { selectImageEditor } from "./imageEditorSlice";
import { LoadableButton } from "../LoadableButton";

export default {
  title: ImageEditor.displayName,
  component: ImageEditor,
  args: {
    src: "https://source.unsplash.com/daily",
  },
} as Meta;

export const Usage: Story<ImageEditorProps> = ({ ...args }) => (
  <ImageEditor {...args} />
);

export const UsageWithGeneration: Story<ImageEditorProps> = ({ ...args }) => {
  const { artifact, loading } = useAppSelector(selectImageEditor);
  const ref = useRef<ImageEditorHandler>();
  return (
    <>
      <ImageEditor ref={ref} {...args} />
      <LoadableButton loading={loading} onClick={() => ref.current.generate()}>
        Apply
      </LoadableButton>
      <img
        src={artifact}
        alt="result"
        className="rounded-full overflow-hidden"
      />
    </>
  );
};
