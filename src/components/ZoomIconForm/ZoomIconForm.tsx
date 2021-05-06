import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { ImageSelector } from "../ImageSelector";
import { ImageEditor } from "../ImageEditor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  generateStart,
  selectImageEditor,
} from "../ImageEditor/imageEditorSlice";
import { Modal } from "../Modal";
import { LoadableButton } from "../LoadableButton";
import { closeModal, openModal, selectModal } from "../Modal/ModalSlice";
import { ImageEditorHandler } from "../ImageEditor/ImageEditor";

export interface ZoomIconFormHandler {
  generate(): void
}

export interface ZoomIconFormProps {

}

const ZoomIconForm = memo(forwardRef<ZoomIconFormHandler, ZoomIconFormProps>((_, ref) => {
  const dispatch = useAppDispatch();
  const { artifact, loading } = useAppSelector(selectImageEditor);
  const { open } = useAppSelector(selectModal);
  const imageEditorRef = useRef<ImageEditorHandler>();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [originalImage, setOriginalImage] = useState<string>(null); // before crop image src

  const handleSelectImage = useCallback((selectedImage: string) => {
    setOriginalImage(selectedImage);
    dispatch(openModal("ImageEditor"));
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      generate() {dispatch()}
    }),
    [artifact, name, bio]
  );

  // TODO: これ治す
  // useEffect(() => {
  //   setModalOpen(false);
  // }, [artifact]);

  return (
    <>
      <Modal
        open={open === "ImageEditor"}
        title="メディアを編集"
        onCancel={() => dispatch(closeModal())}
        onClose={() => dispatch(closeModal())}
        onApply={() => imageEditorRef.current.generate()}
        loading={loading}
        loadingText="生成中..."
      >
        <ImageEditor ref={ref} src={originalImage} />
      </Modal>
      <div className="bg-gray-900 flex flex-col items-center p-4 max-w-md">
        {/* if src show modal & avatar crop */}
        <div className="mb-2">
          <ImageSelector src={artifact} onSelect={handleSelectImage} />
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
}));
ZoomIconForm.displayName = "ZoomIconForm";
export default ZoomIconForm;

const Setting = () => {}