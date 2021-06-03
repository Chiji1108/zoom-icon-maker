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
  Center,
  Stack,
  Fade,
} from "@chakra-ui/react";
import { generate } from "../../lib/formUtils";
import immer from "immer";
import { useImmer } from "use-immer";
import { Setting, SettingInput } from "../SettingInput";
import icons from "../../lib/icons";

export interface FormProps {}

const Form = ({}: FormProps) => {
  const [src, setSrc] = useState<string>();
  const [bio, updateBio] = useImmer<Setting>({
    text: "Chijidosu",
    setting: {
      font: {
        family: "Noto Sans JP",
        weight: "400",
      },
      icon: "none",
      isHidden: false,
    },
  });
  const [name, updateName] = useImmer<Setting>({
    text: "千々岩",
    setting: {
      font: {
        family: "Noto Sans JP",
        weight: "400",
      },
      icon: "none",
      isHidden: false,
    },
  });

  const [result, setResult] = useState<string>();

  //TODO: add EditableControls
  return (
    <>
      <Box p="4" bg="rgb(36,36,36)" maxW="sm" pos="relative">
        <Box pos="absolute" top="0" right="0">
          <Fade in={bio.setting.isHidden} unmountOnExit>
            <IconButton
              borderRadius="full"
              aria-label="add bio"
              icon={<span className="material-icons">add</span>}
              onClick={() =>
                updateBio((draft) => {
                  draft.setting.isHidden = false;
                })
              }
              variant="ghost"
              colorScheme="whiteAlpha"
            />
          </Fade>
        </Box>

        <VStack spacing="4">
          <Box>
            <AvatarInput
              boxSize={bio.setting.isHidden ? 140 : 120}
              value={src}
              onChange={setSrc}
            />
          </Box>
          <Flex
            direction="column"
            alignItems="center"
            my={bio.setting.isHidden ? "2" : undefined}
          >
            <Box pos="relative">
              <Editable
                value={name.text}
                onChange={(nextValue) =>
                  updateName((draft) => {
                    draft.text = nextValue;
                  })
                }
                placeholder="名前を入力"
              >
                <Box
                  verticalAlign={bio.setting.isHidden ? "super" : "text-bottom"}
                  fontFamily={name.setting.font.family}
                  fontWeight={name.setting.font.weight}
                  textColor="white"
                  textAlign="center"
                  fontSize={bio.setting.isHidden ? "4xl" : "3xl"}
                >
                  <EditablePreview />
                  <EditableInput />
                </Box>

                {/* <EditableControls /> */}
              </Editable>
              <Center pos="absolute" right="-44px" top={0} bottom={0}>
                <SettingInput
                  value={name}
                  onChange={updateName}
                  advanced={false}
                />
              </Center>
            </Box>
            {bio.setting.isHidden || (
              <Box pos="relative">
                <Editable
                  value={bio.text}
                  onChange={(nextValue) =>
                    updateBio((draft) => {
                      draft.text = nextValue;
                    })
                  }
                  placeholder="所属/役職/連絡先"
                >
                  <Flex fontSize="xs" alignItems="center">
                    {bio.setting.icon !== "none" && (
                      <Center width="12px" height="12px" m="1">
                        {icons[bio.setting.icon].component}
                      </Center>
                    )}
                    <Box
                      textColor="white"
                      verticalAlign="text-bottom"
                      fontFamily={bio.setting.font.family}
                      fontWeight={bio.setting.font.weight}
                      textAlign="center"
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Box>
                  </Flex>

                  {/* <EditableControls /> */}
                </Editable>
                <Center pos="absolute" right="-44px" top={0} bottom={0}>
                  <SettingInput
                    value={bio}
                    onChange={updateBio}
                    advanced={true}
                  />
                </Center>
              </Box>
            )}
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
