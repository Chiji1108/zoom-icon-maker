import { useCallback, useRef, useState } from "react";
import { ImageSelector } from "../ImageSelector";
import { ImageEditor } from "../ImageEditor";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  generateImage,
  selectImageEditor,
} from "../ImageEditor/imageEditorSlice";
import { CropInfo } from "../ImageEditor/ImageEditor";
import { AvatarInput } from "../AvatarInput";
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
  Box,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
} from "@chakra-ui/react";

export interface FormProps {}

const Form = ({}: FormProps) => {
  const [src, setSrc] = useState<string>();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  //TODO: add EditableControls
  return (
    <Box p="4" bg="gray.900" maxW="sm">
      <VStack spacing="4">
        <Box>
          <AvatarInput value={src} onChange={setSrc} />
        </Box>
        <Box>
          <Editable
            textColor="white"
            value={name}
            onChange={(nextValue) => setName(nextValue)}
            placeholder="名前を入力"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable
            textColor="white"
            value={bio}
            onChange={(nextValue) => setBio(nextValue)}
            placeholder="BIOを入力"
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </Box>
      </VStack>
    </Box>
  );
};
Form.displayName = "Form";
export default Form;
