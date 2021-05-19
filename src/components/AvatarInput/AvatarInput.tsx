import { useCallback, useEffect, useRef, useState } from "react";
import { ImageSelector } from "../ImageSelector";
import { ImageEditor } from "../ImageEditor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  generateImage,
  selectImageEditor,
} from "../ImageEditor/imageEditorSlice";
import { CropInfo } from "../ImageEditor/ImageEditor";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export interface AvatarInputProps {
  value: string;
  onChange: (src: string) => void;
}

const AvatarInput = ({ value, onChange }: AvatarInputProps) => {
  const dispatch = useAppDispatch();
  const { imageSrc, loading } = useAppSelector(selectImageEditor);

  const [originalImage, setOriginalImage] = useState<string>(value); // before crop image src
  const [cropInfo, setCropInfo] = useState<CropInfo>();
  const initialFocusRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onChange(imageSrc);
  }, [imageSrc]);

  const handleSelectImage = useCallback((selectedImage: string) => {
    setOriginalImage(selectedImage);
    onOpen();
  }, []);

  return (
    <>
      <ImageSelector src={imageSrc} onSelect={handleSelectImage} />

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialFocusRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>メディアを編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ImageEditor src={originalImage} onComplete={setCropInfo} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() =>
                dispatch(
                  generateImage(
                    originalImage,
                    cropInfo.area,
                    cropInfo.rotation,
                    onClose
                  )
                )
              }
              ref={initialFocusRef}
              isLoading={loading === "pending"}
              loadingText="生成中..."
            >
              適用
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
AvatarInput.displayName = "AvatarInput";
export default AvatarInput;
