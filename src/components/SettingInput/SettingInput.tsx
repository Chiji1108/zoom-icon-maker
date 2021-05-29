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
  IconButton,
  ButtonGroup,
  FormControl,
  FormLabel,
  Select,
  VStack,
  Switch,
  RadioGroup,
  Radio,
  Stack,
  Flex,
  HStack,
  Text,
  useEditableControls,
  useBoolean,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import {
  SiTwitter,
  SiInstagram,
  SiFacebook,
  SiTiktok,
  SiYoutube,
  SiLine,
  SiEa,
} from "react-icons/si";
import { MdSettings } from "react-icons/md";
import { IconType } from "react-icons/lib";

export interface Setting {
  font: string;
  enabledBio: boolean;
  bioIcon: string;
}

type Icon = { name: string; color: string; Icon: IconType };

// const Icons: Icon[] = [
//   {
//     name: "Twitter",
//     color: "#1DA1F2",
//     Icon: SiTwitter,
//   },
//   {
//     name: "Instagram",
//     color: "#E4405F",
//     Icon: SiInstagram,
//   },
//   {
//     name: "Facebook",
//     color: "#1877F2",
//     Icon: SiFacebook,
//   },
//   {
//     name: "Snapchat",
//     color: "#FFFC00",
//   },
//   {
//     name: "TikTok",
//     color: "#000000",
//     Icon: SiTiktok,
//   },
//   {
//     name: "Youtube",
//     color: "#FF0000",
//     Icon: SiYoutube,
//   },
//   {
//     name: "GitHub",
//     color: "#181717",
//   },
//   {
//     name: "Zoom",
//     color: "#2D8CFF",
//   },
//   {
//     name: "Slack",
//     color: "#4A154B",
//   },
//   {
//     name: "LINE",
//     color: "#00C300",
//     Icon: SiLine,
//   },
//   {
//     name: "Twitch",
//     color: "#9146FF",
//   },
//   {
//     name: "Tinder",
//     color: "#FF6B6B",
//   },
//   {
//     name: "EA",
//     color: "#000000",
//     Icon: SiEa,
//   },
//   {
//     name: "Undertail",
//     color: "#E71D29",
//     Icon: SiEa,
//   },
//   {
//     name: "Riot Games",
//     color: "#D32936",
//     Icon: SiEa,
//   },
//   {
//     name: "Epic Games",
//     color: "#313131",
//   },
//   {
//     name: "PlayStation 5",
//     color: "#003791",
//   },
//   {
//     name: "Nintendo Switch",
//     color: "#E60012",
//   },
//   {
//     name: "Xbox",
//     color: "#107C10",
//   },
// ];

export type SettingInputProps = {
  value: Setting;
  onChange: (nextValue: Setting) => void;
};

const SettingInput = ({ value, onChange }: SettingInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [font, setFont] = useState(value.font);
  const [enabledBio, setEnabledBio] = useBoolean(value.enabledBio);
  const [bioIcon, setBioIcon] = useState<string>(value.bioIcon);

  const initialFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        borderRadius="full"
        aria-label="open setting"
        icon={<MdSettings />}
        onClick={onOpen}
      />

      <Modal
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>設定</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} alignItems="stretch">
              <FormControl>
                <FormLabel>フォント</FormLabel>
                <RadioGroup onChange={setFont} value={font}>
                  <Stack direction="row">
                    <Radio value="Noto Sans JP">Noto Sans JP</Radio>
                    <Radio value="Twitter">Twitter</Radio>
                    <Radio value="Instagram">Instagram</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl>
                <FormLabel>BIO欄を追加する</FormLabel>
                <Switch
                  placeholder="Last name"
                  isChecked={enabledBio}
                  onChange={(e) =>
                    e.target.checked ? setEnabledBio.on : setEnabledBio.off
                  }
                />
              </FormControl>

              <FormControl isDisabled={!enabledBio}>
                <FormLabel>アイコン</FormLabel>
                <RadioGroup onChange={setBioIcon} value={bioIcon}>
                  <Stack direction="row">
                    <Radio value="none">使用しない</Radio>
                    <Radio value="Twitter">
                      <Flex alignItems="center">
                        <SiTwitter />
                        <Text ml={1}>Twitter</Text>
                      </Flex>
                    </Radio>
                    <Radio value="Instagram">
                      <Flex alignItems="center">
                        <SiInstagram />
                        <Text ml={1}>Instagram</Text>
                      </Flex>
                    </Radio>
                    <Radio value="Facebook">
                      <Flex alignItems="center">
                        <SiFacebook />
                        <Text ml={1}>Facebook</Text>
                      </Flex>
                    </Radio>
                    <Radio value="Tik">
                      <Flex alignItems="center">
                        <SiTiktok />
                        <Text ml={1}>Tiktok</Text>
                      </Flex>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onChange({ font, enabledBio, bioIcon });
                onClose();
              }}
              ref={initialFocusRef}
            >
              適用
            </Button>
            <Button onClick={onClose}>キャンセル</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

SettingInput.displayName = "SettingInput";
export default SettingInput;
