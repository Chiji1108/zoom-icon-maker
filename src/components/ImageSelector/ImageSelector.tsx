import { ChangeEvent, memo, useCallback, useRef, useState } from "react";
import { getOrientation } from "get-orientation/browser";
import {
  readFile,
  ORIENTATION_TO_ANGLE,
  getRotatedImage,
} from "../../lib/canvasUtils";
import { MdAddAPhoto, MdFace } from "react-icons/md";
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

export interface ImageSelectorProps {
  src?: string;
  onSelect: (image: string) => void;
}
const ImageSelector = ({ src, onSelect }: ImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>();
  //TODO: 二回目も
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      onSelect(imageDataUrl);
      e.target.files = null;
      inputRef.current.files = null;
    }
  };
  return (
    <Box pos="relative" boxSize={120}>
      <Circle size="full" overflow="hidden">
        {src ? (
          <Image
            src={src}
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
          // <NextImage
          //   src="/avatar-placeholder.png"
          //   alt="avatar placeholder"
          //   layout="fill"
          // />
        )}
      </Circle>

      <IconButton
        pos="absolute"
        bottom="0"
        right="0"
        borderRadius="full"
        aria-label="add a photo"
        icon={<MdAddAPhoto />}
        onClick={() => inputRef.current!.click()}
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
