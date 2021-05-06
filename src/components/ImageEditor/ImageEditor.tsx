import {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { Slider } from "../Slider";
import { MaterialIcon } from "../MaterialIcon";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { generateAsync, selectImageEditor } from "./imageEditorSlice";

export interface ImageEditorProps {
  src: string;
}

export interface ImageEditorHandler {
  generate: () => void;
}

const ImageEditor = forwardRef<ImageEditorHandler, ImageEditorProps>(
  ({ src }, ref) => {
    const dispatch = useAppDispatch();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>(null);

    const onCropComplete = useCallback(
      (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
      },
      []
    );

    useImperativeHandle(
      ref,
      () => ({
        generate() {
          dispatch(generateAsync({ src, croppedAreaPixels, rotation }));
        },
      }),
      [src, croppedAreaPixels, rotation]
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
          <label className="flex-1 flex items-center space-x-2">
            <MaterialIcon
              icon="zoom_out"
              className="text-gray-500 hover:text-gray-700 transition-all"
              onClick={() =>
                setZoom((prev) => {
                  const result = prev - 0.1;
                  if (result >= 3 || result <= 1) return prev;
                  return result;
                })
              }
            />
            <Slider
              className="flex-1"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(+e.target.value)}
            />
            <MaterialIcon
              icon="zoom_in"
              className="text-gray-500 hover:text-gray-700 transition-all"
              onClick={() =>
                setZoom((prev) => {
                  const result = prev + 0.1;
                  if (result >= 3 || result <= 1) return prev;
                  return result;
                })
              }
            />
          </label>
          <label className="flex-1 flex items-center space-x-2">
            <MaterialIcon
              icon="rotate_left"
              className="text-gray-500 hover:text-gray-700 transition-all"
              onClick={() =>
                setRotation((prev) => {
                  const result = prev - 1;
                  if (result >= 180 || result <= -180) return prev;
                  return result;
                })
              }
            />
            <Slider
              className="flex-1"
              value={rotation}
              min={-180}
              max={180}
              step={1}
              aria-labelledby="Rotation"
              onChange={(e) => setRotation(+e.target.value)}
            />
            <MaterialIcon
              icon="rotate_right"
              className="text-gray-500 hover:text-gray-700 transition-all"
              onClick={() =>
                setRotation((prev) => {
                  const result = prev + 1;
                  if (result >= 180 || result <= -180) return prev;
                  return result;
                })
              }
            />
          </label>
        </div>
      </>
    );
  }
);

ImageEditor.displayName = "ImageEditor";
export default ImageEditor;
