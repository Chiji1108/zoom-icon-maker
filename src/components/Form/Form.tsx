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
  ButtonGroup,
  Box,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
  Image,
  IconButton,
  useEditableControls,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { generate } from "../../lib/formUtils";
import { SiTwitter } from "react-icons/si";
import simpleIcons from "simple-icons";
import { Setting } from "../SettingInput";
import { MdCheck, MdClose, MdEdit } from "react-icons/md";

type Font = "Shippori Mincho" | "DotGothic16";

export interface FormProps {}

const Form = ({}: FormProps) => {
  //TODO: initial value とか ボタンとかちゃんとする
  const [src, setSrc] = useState<string>();
  const [name, setName] = useState("千々岩");
  const [bio, setBio] = useState("Chijidosu");
  const [setting, setSetting] = useState<Setting>({
    font: "Shippori Mincho",
    enabledBio: true,
    bioIcon: "Twitter",
  });

  const [result, setResult] = useState<string>();

  //TODO: add EditableControls
  return (
    <>
      <Box p="4" bg="gray.900" maxW="sm">
        <VStack spacing="4">
          <Box>
            <AvatarInput value={src} onChange={setSrc} />
          </Box>
          <Flex direction="column" alignItems="center">
            <Editable
              value={name}
              onChange={(nextValue) => setName(nextValue)}
              placeholder="名前を入力"
            >
              <Box
                textColor="white"
                fontFamily={setting.font}
                textAlign="center"
                fontSize="3xl"
              >
                <EditablePreview />
                <EditableInput />
              </Box>

              {/* <EditableControls /> */}
            </Editable>
            <Editable
              value={bio}
              onChange={(nextValue) => setBio(nextValue)}
              placeholder="BIOを入力"
            >
              <Flex fontSize="xs" alignItems="center">
                <Box textColor="#1DA1F2" mr={1}>
                  <SiTwitter />
                </Box>
                <Box
                  textColor="white"
                  fontFamily={setting.font}
                  textAlign="center"
                >
                  <EditablePreview />
                  <EditableInput />
                </Box>
              </Flex>

              {/* <EditableControls /> */}
            </Editable>
          </Flex>
        </VStack>
      </Box>
      <Button
        onClick={async () =>
          setResult(
            await generate({
              src,
              name,
              bio,
              setting,
            })
          )
        }
      >
        生成
      </Button>
      <Image src={result} alt="result" boxSize={"512px"} />
    </>
  );
};
Form.displayName = "Form";
export default Form;

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        aria-label="submit"
        icon={<MdCheck />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="cancel"
        icon={<MdClose />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="edit"
        size="sm"
        icon={<MdEdit />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};
