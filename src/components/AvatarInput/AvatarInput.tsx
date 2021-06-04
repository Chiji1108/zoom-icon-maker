import { useCallback, useEffect, useRef, useState } from "react";
import { ImageSelector } from "../ImageSelector";
import { ImageEditor } from "../ImageEditor";
// import { useAppDispatch, useAppSelector } from "../../app/hooks";
// import {
//   generateImage,
//   selectImageEditor,
// } from "../ImageEditor/imageEditorSlice";
import { CropInfo } from "../ImageEditor/ImageEditor";
import { getCroppedImg } from "../../lib/canvasUtils";
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
  useBoolean,
} from "@chakra-ui/react";

export interface AvatarInputProps {
  boxSize?: number;
  value?: string;
  onChange: (src: string) => void;
}

const AvatarInput = ({ boxSize = 120, value, onChange }: AvatarInputProps) => {
  // const dispatch = useAppDispatch();
  // const { imageSrc, loading } = useAppSelector(selectImageEditor);

  const [croppedImage, setCroppedImage] = useState<string>();
  const [originalImage, setOriginalImage] = useState<string | undefined>(value); // before crop image src

  useEffect(() => {
    setOriginalImage(value);
    setCroppedImage(value);
  }, [value]);
  const [isLoading, setLoading] = useBoolean(false);
  const [cropInfo, setCropInfo] = useState<CropInfo>();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   onChange(imageSrc);
  // }, [imageSrc]);

  const handleSelectImage = (selectedImage: string) => {
    setOriginalImage(selectedImage);
    onOpen();
  };

  const handleGenerate = async () => {
    setLoading.on();
    const result = await getCroppedImg(
      originalImage!,
      cropInfo!.area,
      cropInfo!.rotation
    );
    setCroppedImage(result);
    onChange(result);
    setLoading.off();
    onClose();
  };
  // dispatch(
  //   generateImage(
  //     originalImage!,
  //     cropInfo!.area,
  //     cropInfo!.rotation,
  //     onClose
  //   )
  // )

  return (
    <>
      <ImageSelector
        boxSize={boxSize}
        onSelect={handleSelectImage}
        previewSrc={croppedImage}
      />

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
            <ImageEditor src={originalImage!} onComplete={setCropInfo} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleGenerate}
              ref={initialFocusRef}
              isLoading={isLoading}
              loadingText="生成中..."
              isDisabled={!originalImage}
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
