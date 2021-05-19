// import { Story, Meta } from "@storybook/react";
// import { action } from "@storybook/addon-actions";
// import { useRef, useState } from "react";
// import ImageEditor, { CropInfo, ImageEditorProps } from "./ImageEditor";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import { generateImage, selectImageEditor } from "./imageEditorSlice";
// import { LoadableButton } from "../LoadableButton";
// import { Area } from "react-easy-crop/types";

// export default {
//   title: ImageEditor.displayName,
//   component: ImageEditor,
//   args: {
//     src: "https://source.unsplash.com/daily",
//     onComplete: action("onComplete"),
//   },
// } as Meta<ImageEditorProps>;

// export const Usage: Story<ImageEditorProps> = ({ ...args }) => {
//   return <ImageEditor {...args} />;
// };

// export const UsageWithGeneration: Story<ImageEditorProps> = ({
//   onComplete,
//   ...args
// }) => {
//   const [cropInfo, setCropInfo] = useState<CropInfo>(null);
//   const dispatch = useAppDispatch();
//   const { imageSrc, loading } = useAppSelector(selectImageEditor);
//   return (
//     <>
//       {" "}
//       bg
//       <ImageEditor {...args} onComplete={setCropInfo} />
//       <LoadableButton
//         loading={loading === "pending"}
//         onClick={() =>
//           dispatch(
//             generateImage(
//               args.src,
//               cropInfo.area,
//               cropInfo.rotation,
//               action("generate sucess")
//             )
//           )
//         }
//       >
//         Apply
//       </LoadableButton>
//       <img
//         src={imageSrc}
//         alt="result"
//         className="rounded-full overflow-hidden"
//       />
//     </>
//   );
// };

// // export const UsageWithGeneration: Story<ImageEditorProps> = ({ ...args }) => {
// //   const { artifact, loading } = useAppSelector(selectImageEditor);
// //   const ref = useRef<ImageEditorHandler>();
// //   return (
// //     <>
// //       <ImageEditor ref={ref} {...args} />
// //       <LoadableButton loading={loading} onClick={() => ref.current.generate()}>
// //         Apply
// //       </LoadableButton>
// //       <img
// //         src={artifact}
// //         alt="result"
// //         className="rounded-full overflow-hidden"
// //       />
// //     </>
// //   );
// // };
