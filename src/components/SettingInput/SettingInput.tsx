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
  Icon,
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
  useRadio,
  Box,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  useRadioGroup,
  SimpleGrid,
  Circle,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  ChangeEvent,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import icons, { Icon as BrandIcon } from "../../lib/icons";

// type SVGIconProps = {
//   title: string;
//   path: string;
//   hex: string;
// };

// const SVGIcon = ({ title, path, hex }: SVGIconProps) => (
//   <svg
//     role="img"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//     fill={`#${hex}`}
//   >
//     <title>{title}</title>
//     <path d={path} />
//   </svg>
// );

export interface Setting {
  font: string;
  enabledBio: boolean;
  bioIcon: string;
}

// const icons: Icon[] = [
//   {
//     name: "Twitter",
//     color: "#1DA1F2",
//     fa: "fa-twitter",
//     unicode: "f099",
//   },
//   {
//     name: "Instagram",
//     fa: "fa-instagram",
//     color: "#E4405F",
//   },
//   {
//     name: "Facebook",
//     color: "#1877F2",
//     fa: "fa-facebook",
//   },
//   // {
//   //   name: "Snapchat",
//   //   color: "#FFFC00",
//   // },
//   {
//     name: "TikTok",
//     color: "#000000",
//     fa: "fa-tiktok",
//     // Icon: SiTiktok,
//   },
//   {
//     name: "Youtube",
//     color: "#FF0000",
//     fa: "fa-youtube",
//     // Icon: SiYoutube,
//   },
//   {
//     name: "GitHub",
//     fa: "fa-github",
//     color: "#181717",
//   },
//   // {
//   //   name: "Zoom",
//   //   color: "#2D8CFF",
//   // },
//   // {
//   //   name: "Slack",
//   //   color: "#4A154B",
//   // },
//   {
//     name: "LINE",
//     color: "#00C300",
//     fa: "fa-line",
//     // Icon: SiLine,
//   },
//   {
//     name: "Twitch",
//     color: "#9146FF",
//     fa: "fa-twitch",
//   },
//   // {
//   //   name: "Tinder",
//   //   color: "#FF6B6B",
//   // },
//   // {
//   //   name: "EA",
//   //   color: "#000000",
//   //   Icon: SiEa,
//   // },
//   // {
//   //   name: "Undertail",
//   //   color: "#E71D29",
//   //   Icon: SiEa,
//   // },
//   // {
//   //   name: "Riot Games",
//   //   color: "#D32936",
//   //   Icon: SiEa,
//   // },
//   // {
//   //   name: "Epic Games",
//   //   color: "#313131",
//   // },
//   // {
//   //   name: "PlayStation 5",
//   //   color: "#003791",
//   // },
//   // {
//   //   name: "Nintendo Switch",
//   //   color: "#E60012",
//   // },
//   // {
//   //   name: "Xbox",
//   //   color: "#107C10",
//   // },
// ];

type IconName =
  | "Twitter"
  | "Instagram"
  | "Facebook"
  // | "LINE"
  | "GitHub"
  // | "Youtube"
  // | "TikTok"
  | "Twitch"
  | "Discord";

type Family = "san-serif" | "serif";

type Weight =
  | "normal"
  | "bold"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";

type Font = {
  family: string;
  weights: Weight[];
  defaultWeight: Weight;
};

const fonts: Array<Font> = [
  {
    family: "san-serif",
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  {
    family: "serif",
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  {
    family: "Noto Sans JP",
    weights: ["100", "300", "400", "500", "700", "900"],
    defaultWeight: "400",
  },
  {
    family: "Shippori Mincho",
    weights: ["400", "500", "600", "700", "800"],
    defaultWeight: "400",
  },
  {
    family: "DotGothic16",
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
];

const getFont = (family: string) =>
  fonts.find((font) => font.family === family);

export type SettingInputProps = {
  value: any;
  onChange: (nextValue: any) => void;
  advanced: boolean;
};

const SettingInput = ({ value, onChange, advanced }: SettingInputProps) => {
  const [text, setText] = useState<string>();
  const [fontFamily, setFontFamily] = useState<string>("Noto Sans JP");
  const [fontWeight, setFontWeight] = useState<Weight>("400");
  const [isHidden, setHidden] = useBoolean();
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "icon",
    defaultValue: "none",
    onChange: console.log,
  });

  const group = getRootProps();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const handleSelectFontFamily = (nextValue: string) => {
    setFontFamily(nextValue);
    const nextFont = getFont(nextValue);

    if (!(fontWeight && nextFont?.weights.includes(fontWeight as Weight))) {
      setFontWeight(nextFont?.defaultWeight!);
    }
  };

  // const handleOpen = () => {
  //   setFont(value.font);
  //   value.enabledBio ? setEnabledBio.on() : setEnabledBio.off();
  //   setBioIcon(value.bioIcon);
  //   onOpen();
  // };

  return (
    <>
      <IconButton
        borderRadius="full"
        aria-label="open setting"
        icon={<span className="material-icons">settings</span>}
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
            <Stack>
              <Box
                p={4}
                bg="rgb(36,36,36)"
                color="white"
                fontFamily={fontFamily}
                fontWeight={fontWeight}
                fontSize="2xl"
              >
                <Editable
                  placeholder="プレビューテキスト"
                  value={text}
                  onChange={setText}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Tabs>
                <TabList>
                  <Tab isDisabled={isHidden}>テキスト</Tab>
                  {advanced && (
                    <>
                      <Tab isDisabled={isHidden}>アイコン</Tab>
                      <Tab>その他</Tab>
                    </>
                  )}
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Stack direction="row">
                      <FormControl>
                        <FormLabel>フォント</FormLabel>
                        <RadioGroup
                          value={fontFamily}
                          onChange={handleSelectFontFamily}
                        >
                          <Stack>
                            {fonts.map(({ family }) => (
                              <Radio key={family} value={family}>
                                <Text fontFamily={family}>{family}</Text>
                              </Radio>
                            ))}
                          </Stack>
                        </RadioGroup>
                      </FormControl>

                      {fontFamily && (
                        <FormControl>
                          <FormLabel>太さ</FormLabel>
                          <RadioGroup
                            value={fontWeight}
                            onChange={(v) => setFontWeight(v as Weight)}
                          >
                            <Stack>
                              {getFont(fontFamily)?.weights.map((weight) => (
                                <Radio key={weight} value={weight}>
                                  <Text
                                    fontFamily={fontFamily}
                                    fontWeight={weight}
                                  >
                                    {weight}
                                  </Text>
                                </Radio>
                              ))}
                            </Stack>
                          </RadioGroup>
                        </FormControl>
                      )}
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <Stack {...group}>
                      <Radio {...getRadioProps({ value: "none" })}>
                        使用しない
                      </Radio>

                      <Wrap>
                        {icons.map((icon) => {
                          const radio = getRadioProps({ value: icon.title });
                          return (
                            <WrapItem>
                              <RadioIcon
                                key={icon.title}
                                {...radio}
                                icon={icon}
                              />
                            </WrapItem>
                          );
                        })}
                      </Wrap>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                // onChange({ font, enabledBio, bioIcon });
                onClose();
              }}
              ref={initialFocusRef}
              isDisabled
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

type RadioIconProps = {
  icon: BrandIcon;
};

const RadioIcon = ({ icon, ...props }: RadioIconProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Circle
        {...checkbox}
        cursor="pointer"
        boxShadow="md"
        color={`#${icon.hex}`}
        bg="rgb(36,36,36)"
        transition="all 0.2s ease"
        // boxSizing="content-box"
        _checked={{
          borderColor: "blue.400",
          borderWidth: "3px",
        }}
        _hover={{
          bg: "rgba(36,36,36,0.9)",
        }}
        _focus={{
          // boxShadow: "outline",
          bg: "rgba(36,36,36,0.8)",
        }}
        w="40px"
        h="40px"
      >
        <Icon>
          <path fill="currentColor" d={icon.path} />
        </Icon>
      </Circle>
    </Box>
  );
};
