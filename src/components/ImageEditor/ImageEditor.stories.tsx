import { Story, Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import ImageEditor, { CropInfo, ImageEditorProps } from "./ImageEditor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { generateImage, selectImageEditor } from "./imageEditorSlice";
import { Button } from "@chakra-ui/button";
import { Image, Box } from "@chakra-ui/react";

export default {
  title: "Atoms/" + ImageEditor.displayName,
  component: ImageEditor,
  args: {
    src: "https://source.unsplash.com/daily",
    onComplete: action("onComplete"),
  },
} as Meta<ImageEditorProps>;

export const Usage: Story<ImageEditorProps> = ({ ...args }) => {
  return <ImageEditor {...args} />;
};

export const UsageWithGeneration: Story<ImageEditorProps> = ({
  onComplete,
  ...args
}) => {
  const [cropInfo, setCropInfo] = useState<CropInfo>();
  const dispatch = useAppDispatch();
  const { imageSrc, loading } = useAppSelector(selectImageEditor);
  return (
    <Box>
      <ImageEditor {...args} onComplete={setCropInfo} />
      <Button
        isLoading={loading === "pending"}
        onClick={() =>
          dispatch(
            generateImage(
              args.src,
              cropInfo!.area,
              cropInfo!.rotation,
              action("generate sucess")
            )
          )
        }
      >
        Apply
      </Button>
      <Image src={imageSrc} alt="result" borderRadius="full" />
    </Box>
  );
};

// export const UsageWithGeneration: Story<ImageEditorProps> = ({ ...args }) => {
//   const { artifact, loading } = useAppSelector(selectImageEditor);
//   const ref = useRef<ImageEditorHandler>();
//   return (
//     <>
//       <ImageEditor ref={ref} {...args} />
//       <LoadableButton loading={loading} onClick={() => ref.current.generate()}>
//         Apply
//       </LoadableButton>
//       <img
//         src={artifact}
//         alt="result"
//         className="rounded-full overflow-hidden"
//       />
//     </>
//   );
// };
