import { ChangeEvent } from "react";
import { getOrientation } from "get-orientation/browser";
import {
  readFile,
  ORIENTATION_TO_ANGLE,
  getRotatedImage,
} from "../../lib/canvasUtils";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

export interface ImageSelectorProps {
  currentImage?: string;
  onSelect: (image: string) => void;
}

// TODO: hover transition

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
    <div>
      <label>
        {currentImage ? (
          <img
            className="rounded-full overflow-hidden h-24 w-24"
            src={currentImage}
          />
        ) : (
          <div className="bg-gray-300 rounded-full overflow-hidden h-24 w-24 flex items-center justify-center">
            <span className="material-icons text-xl text-gray-600">
              add_photo_alternate
            </span>
            {/* TODO */}
            {/* <AddPhotoAlternateIcon /> */}
          </div>
        )}
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onFileChange}
        />
      </label>
    </div>
  );
}