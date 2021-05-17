import {
  useState,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import Cropper from "react-easy-crop";
import { Area, Point } from "react-easy-crop/types";
import { Slider } from "../Slider";
import { MaterialIcon } from "../MaterialIcon";

export interface CropInfo {
  area: Area;
  rotation: number;
}

export interface ImageEditorProps {
  src: string;
  onComplete: ({ area, rotation }: CropInfo) => void;
}

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
    <>
      <div className="relative w-full h-52 sm:h-96 bg-gray-900">
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
      </div>
      <div className="p-4 flex flex-col xs:flex-row items-stretch xs:items-center space-y-4 xs:space-y-0 xs:space-x-12">
        <Controller
          value={zoom}
          setValue={setZoom}
          min={1}
          max={3}
          step={0.1}
          leftIcon="zoom_out"
          rightIcon="zoom_in"
          a11yLabel="Zoom"
        />
        <Controller
          value={rotation}
          setValue={setRotation}
          min={-180}
          max={180}
          step={1}
          leftIcon="rotate_left"
          rightIcon="rotate_right"
          a11yLabel="Rotation"
        />
      </div>
    </>
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
  leftIcon: string;
  rightIcon: string;
  a11yLabel: string;
}

const Controller = ({
  value,
  setValue,
  min,
  max,
  step,
  leftIcon,
  rightIcon,
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
    <label className="flex-1 flex items-center space-x-2">
      <MaterialIcon
        className="text-gray-500 hover:text-gray-700 transition-all"
        onClick={onLeftClick}
      >
        {leftIcon}
      </MaterialIcon>
      <Slider
        className="flex-1"
        value={value}
        min={min}
        max={max}
        step={step}
        aria-labelledby={a11yLabel}
        onChange={(e) => setValue(+e.target.value)}
      />
      <MaterialIcon
        className="text-gray-500 hover:text-gray-700 transition-all"
        onClick={onRightClick}
      >
        {rightIcon}
      </MaterialIcon>
    </label>
  );
};
