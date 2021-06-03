import { useState } from "react";
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

export interface FormProps {}

const Form = ({}: FormProps) => {
  //TODO: initial value とか ボタンとかちゃんとする
  const [src, setSrc] = useState<string>();
  const [name, setName] = useState("千々岩");
  const [bio, setBio] = useState("Chijidosu");
  const [setting, setSetting] = useState({
    font: "Shippori Mincho",
    enabledBio: true,
    bioIcon: "Twitter",
  });

  const [result, setResult] = useState<string>();

  //TODO: add EditableControls
  return (
    <>
      <Box p="4" bg="rgb(36,36,36)" maxW="sm">
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
              placeholder="所属/役職/連絡先"
            >
              <Flex fontSize="xs" alignItems="center">
                <Box textColor="#1DA1F2" mr={1}>
                  {/* <SiTwitter /> */}
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
        isDisabled={!src || !name}
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
        icon={<span className="material-icons">done</span>}
        {...getSubmitButtonProps()}
      />
      <IconButton
        aria-label="cancel"
        icon={<span className="material-icons">close</span>}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        aria-label="edit"
        size="sm"
        icon={<span className="material-icons">edit</span>}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};
