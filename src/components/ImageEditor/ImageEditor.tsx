import { useState, useCallback, Dispatch, SetStateAction } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop/types";
import {
  HStack,
  IconButton,
  Slider,
  Box,
  VStack,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

export interface CropInfo {
  area: Area;
  rotation: number;
}

export interface ImageEditorProps {
  src: string;
  onComplete: ({ area, rotation }: CropInfo) => void;
}

//TODO: children: {editor, button}

const ImageEditor = ({ src, onComplete }: ImageEditorProps) => {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      onComplete({ area: croppedAreaPixels, rotation });
    },
    [rotation]
  );

  return (
    <Box maxW="md">
      <Box pos="relative" w="full" h={["52", "72"]} bg="gray.900">
        <Cropper
          image={src}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </Box>
      <Box p="4">
        <VStack spacing="4" align="stretch">
          <Controller
            value={zoom}
            setValue={setZoom}
            min={1}
            max={3}
            step={0.1}
            a11yLabel="Zoom"
            renderLeftIcon={(onClick) => (
              <IconButton
                onClick={onClick}
                aria-label="zoom out"
                icon={<span className="material-icons">zoom_out</span>}
              />
            )}
            renderRightIcon={(onClick) => (
              <IconButton
                onClick={onClick}
                aria-label="zoom in"
                icon={<span className="material-icons">zoom_in</span>}
              />
            )}
          />
          <Controller
            value={rotation}
            setValue={setRotation}
            min={-180}
            max={180}
            step={1}
            a11yLabel="Rotation"
            renderLeftIcon={(onClick) => (
              <IconButton
                onClick={onClick}
                aria-label="rotate left"
                icon={<span className="material-icons">rotate_left</span>}
              />
            )}
            renderRightIcon={(onClick) => (
              <IconButton
                onClick={onClick}
                aria-label="rotate right"
                icon={<span className="material-icons">rotate_right</span>}
              />
            )}
          />
        </VStack>
      </Box>
    </Box>
  );
};
ImageEditor.displayName = "ImageEditor";
export default ImageEditor;

interface ControllerProps {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  step: number;
  renderLeftIcon: (onClick: () => void) => void;
  renderRightIcon: (onClick: () => void) => void;
  a11yLabel: string;
}

const Controller = ({
  value,
  setValue,
  min,
  max,
  step,
  renderLeftIcon,
  renderRightIcon,
  a11yLabel,
}: ControllerProps) => {
  const onLeftClick = useCallback(
    () =>
      setValue((prev) => {
        const result = prev - step;
        if (result > max || result < min) return prev;
        return result;
      }),
    []
  );
  const onRightClick = useCallback(
    () =>
      setValue((prev) => {
        const result = prev + step;
        if (result > max || result < min) return prev;
        return result;
      }),
    []
  );

  return (
    <HStack spacing="4">
      {renderLeftIcon(onLeftClick)}
      <Slider
        flex="1"
        value={value}
        min={min}
        max={max}
        step={step}
        aria-label={a11yLabel}
        onChange={(v) => setValue(v)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      {renderRightIcon(onRightClick)}
    </HStack>
  );
};
