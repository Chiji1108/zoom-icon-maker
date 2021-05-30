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

export interface ImageSelectorProps {
  onSelect: (image: string) => void;
  previewSrc?: string;
}
const ImageSelector = ({ onSelect, previewSrc }: ImageSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  //TODO: 二回目も
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
      e.target.files = null;
      // inputRef.current.files = null;
    }
  };
  return (
    <Box pos="relative" boxSize={120}>
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
          //TODO: 選択されていない時の改善
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
        icon={<span className="material-icons">add_a_photo</span>}
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
