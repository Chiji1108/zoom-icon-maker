import { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import { getOrientation } from "get-orientation/browser";
import { readFile, getAngle, getRotatedImage } from "../../lib/canvasUtils";
import {
  Image,
  IconButton,
  Input,
  Box,
  FormControl,
  FormLabel,
  Icon,
  Skeleton,
  Circle,
  Center,
} from "@chakra-ui/react";
import NextImage from "next/image";

const CameraIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M3,4V1h2v3h3v2H5v3H3V6H0V4H3z M6,10V7h3V4h7l1.83,2H21c1.1,0,2,0.9,2,2v12c0,1.1-0.9,2-2,2H5c-1.1,0-2-0.9-2-2V10H6z M13,19c2.76,0,5-2.24,5-5s-2.24-5-5-5s-5,2.24-5,5S10.24,19,13,19z M9.8,14c0,1.77,1.43,3.2,3.2,3.2s3.2-1.43,3.2-3.2 s-1.43-3.2-3.2-3.2S9.8,12.23,9.8,14z"
    />
  </Icon>
);
export interface ImageSelectorProps {
  boxSize?: number;
  onSelect: (image: string) => void;
  previewSrc?: string;
}
const ImageSelector = ({
  boxSize = 120,
  onSelect,
  previewSrc,
}: ImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      const orientation = await getOrientation(file);
      const rotation = getAngle(orientation);
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      onSelect(imageDataUrl);
      e.target.value = "";
    }
  };
  return (
    <Box pos="relative" boxSize={boxSize} transition="all">
      <Circle size="full" overflow="hidden">
        {previewSrc ? (
          <Image
            src={previewSrc}
            alt="preview"
            boxSize="full"
            fallback={
              <Skeleton>
                <Box boxSize="full" />
              </Skeleton>
            }
            fit="cover"
          />
        ) : (
          <Box bg="gray" boxSize="full" />
        )}
      </Circle>

      <IconButton
        pos="absolute"
        bottom="0"
        right="0"
        isRound
        aria-label="add a photo"
        icon={<CameraIcon />}
        onClick={() => inputRef.current!.click()}
        fontSize="24"
      />
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={inputRef}
        style={{ display: "none" }}
      />
    </Box>
  );
};
ImageSelector.displayName = "ImageSelector";
export default ImageSelector;
