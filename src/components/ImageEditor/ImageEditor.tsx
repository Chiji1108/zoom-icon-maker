import { useState, useCallback, Dispatch, SetStateAction } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { Slider } from "../Slider";
import { getCroppedImg } from "../../lib/canvasUtils";
import { LoadableButton } from "../LoadableButton";

export interface ImageEditorProps {
  originalImage: string;
  onComplate: (resultImage: string) => void;
  onError: (error: Error) => void;
}

export default function ImageEditor({
  originalImage,
  onComplate,
  onError,
}: ImageEditorProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleApply = useCallback(() => {
    setLoading(true);
    getCroppedImg(originalImage, croppedAreaPixels, rotation)
      .then((croppedImage) => {
        onComplate(croppedImage);
      })
      .catch((e) => onError(e))
      .finally(() => setLoading(false));
  }, [originalImage, croppedAreaPixels, rotation]);

  return (
    <>
      <div className="relative w-full h-52 sm:h-96 bg-gray-900">
        <Cropper
          image={originalImage}
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
      <div className="p-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-12">
        <label className="flex-1 flex items-center">
          <div className="whitespace-nowrap w-14">拡大</div>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(+e.target.value)}
          />
        </label>
        <label className="flex-1 flex items-center">
          <div className="whitespace-nowrap w-14">回転</div>
          <Slider
            value={rotation}
            min={-180}
            max={180}
            step={3}
            aria-labelledby="Rotation"
            onChange={(e) => setRotation(+e.target.value)}
          />
        </label>
        <LoadableButton
          onClick={handleApply}
          loading={loading}
          loadingText="生成中..."
        >
          適用
        </LoadableButton>
      </div>
    </>
  );
}
