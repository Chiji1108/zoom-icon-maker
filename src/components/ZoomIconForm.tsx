import { memo, useCallback, useEffect, useState } from "react";
import { ImageSelector } from "./ImageSelector";
import { ImageEditor } from "./ImageEditor";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  generateStart,
  selectImageEditor,
} from "./ImageEditor/imageEditorSlice";
import { Modal } from "./Modal";

const ZoomIconForm = memo(() => {
  const dispatch = useAppDispatch();
  const { croppedSrc, loading } = useAppSelector(selectImageEditor);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [originalImage, setOriginalImage] = useState<string>(null); // before crop image src
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectImage = useCallback((selectedImage: string) => {
    setOriginalImage(selectedImage);
    setModalOpen(true);
  }, []);

  useEffect(() => {
    setModalOpen(false);
  }, [croppedSrc]);

  return (
    <>
      <Modal
        open={modalOpen}
        title="メディアを編集"
        onCancel={() => setModalOpen(false)}
        onClose={() => setModalOpen(false)}
        onApply={() => dispatch(generateStart())}
        loading={loading}
        loadingText="生成中..."
      >
        <ImageEditor src={originalImage} />
      </Modal>
      <div className="bg-gray-900 flex flex-col items-center p-4 max-w-md">
        {/* if src show modal & avatar crop */}
        <div className="mb-2">
          <ImageSelector src={croppedSrc} onSelect={handleSelectImage} />
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-white text-center w-full"
            placeholder="名前を入力"
          />
        </div>

        <div>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="bg-transparent text-white text-center w-full"
            placeholder="BIOを入力"
          />
        </div>
      </div>
    </>
  );
});
ZoomIconForm.displayName = "ZoomIconForm";
export default ZoomIconForm;
