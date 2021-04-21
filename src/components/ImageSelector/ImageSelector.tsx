import { ChangeEvent } from "react";
import { getOrientation } from "get-orientation/browser";
import {
  readFile,
  ORIENTATION_TO_ANGLE,
  getRotatedImage,
} from "../../lib/canvasUtils";

export interface ImageSelectorProps {
  currentImage?: string;
  onSelect: (image: string) => void;
}

export default function ImageSelector({
  currentImage,
  onSelect,
}: ImageSelectorProps) {
  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      onSelect(imageDataUrl);
    }
  };
  return (
    // TODO: improve UI
    <label className="cursor-pointer">
      {currentImage ? (
        <div className="rounded-full overflow-hidden relative h-36 w-36 group">
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
            <span className="material-icons text-2xl group-hover:text-3xl text-gray-200 opacity-0 group-hover:opacity-100 transition-all">
              add_photo_alternate
            </span>
          </div>
          <img className="w-full h-full" src={currentImage} />
        </div>
      ) : (
        <div className="rounded-full overflow-hidden h-36 w-36 bg-gray-200 flex items-center justify-center group">
          <span className="material-icons text-2xl group-hover:text-3xl text-action transition-all">
            add_photo_alternate
          </span>
        </div>
      )}
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={onFileChange}
      />
    </label>
  );
}
