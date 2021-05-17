import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageSelector } from "../ImageSelector";
import { ImageEditor } from "../ImageEditor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  generateImage,
  selectImageEditor,
} from "../ImageEditor/imageEditorSlice";
import { Modal, ModalFooter } from "../Modal";
import { LoadableButton } from "../LoadableButton";
import { Button } from "../Button";
import { closeModal, openModal, selectModal } from "../Modal/ModalSlice";
import { CropInfo } from "../ImageEditor/ImageEditor";

export interface FormProps {}

const Form = memo(({}: FormProps) => {
  const dispatch = useAppDispatch();
  const { imageSrc, loading } = useAppSelector(selectImageEditor);
  // const { open } = useAppSelector(selectModal);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const [originalImage, setOriginalImage] = useState<string>(null); // before crop image src
  const [cropInfo, setCropInfo] = useState<CropInfo>();
  const initialFocusRef = useRef();

  const handleSelectImage = useCallback((selectedImage: string) => {
    setOriginalImage(selectedImage);
    setOpen(true);
  }, []);

  // TODO: これ治す
  // useEffect(() => {
  //   setModalOpen(false);
  // }, [artifact]);

  return (
    <>
      <Modal
        // open={open == "ImageEditor"}
        open={open}
        title="メディアを編集"
        onClose={() => setOpen(false)}
        initialFocusRef={initialFocusRef}
      >
        <ImageEditor src={originalImage} onComplete={setCropInfo} />
        <ModalFooter>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            キャンセル
          </Button>
          <LoadableButton
            ref={initialFocusRef}
            loading={loading === "pending"}
            loadingText="生成中..."
            onClick={() =>
              dispatch(
                generateImage(
                  originalImage,
                  cropInfo.area,
                  cropInfo.rotation,
                  () => setOpen(false)
                )
              )
            }
          >
            適用
          </LoadableButton>
        </ModalFooter>
      </Modal>
      <div className="bg-gray-900 flex flex-col items-center p-4 max-w-md">
        {/* if src show modal & avatar crop */}
        <div className="mb-2">
          <ImageSelector src={imageSrc} onSelect={handleSelectImage} />
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
Form.displayName = "Form";
export default Form;

const Setting = () => {};
