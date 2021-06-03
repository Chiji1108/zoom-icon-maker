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
  Center,
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

import icons from "../../lib/icons";

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
  [key: string]: {
    weights: Weight[];
    defaultWeight: Weight;
  };
};

const fonts: Font = {
  "san-serif": {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  serif: {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
  "Noto Sans JP": {
    weights: ["100", "300", "400", "500", "700", "900"],
    defaultWeight: "400",
  },
  "Shippori Mincho": {
    weights: ["400", "500", "600", "700", "800"],
    defaultWeight: "400",
  },
  DotGothic16: {
    weights: ["normal", "bold"],
    defaultWeight: "normal",
  },
};

export type SettingInputProps = {
  value: SettingInputValue;
  onChange: (nextValue: SettingInputValue) => void;
  advanced: boolean;
};

type SettingInputValue = {
  text: string;
  setting: {
    font: {
      family: string;
      weight: Weight;
    };
    icon: "none" | keyof typeof icons;
    isHidden: boolean;
  };
};

const SettingInput = ({ value, onChange, advanced }: SettingInputProps) => {
  const [text, setText] = useState<string>(value.text);
  const [fontFamily, setFontFamily] = useState<string>(
    value.setting.font.family
  );
  const [fontWeight, setFontWeight] = useState<Weight>(
    value.setting.font.weight
  );
  const { getRootProps, getRadioProps, value: icon } = useRadioGroup({
    name: "icon",
    defaultValue: value.setting.icon,
  });
  const [isHidden, setHidden] = useBoolean(value.setting.isHidden);

  const group = getRootProps();

  const isTouched = !(
    value.text === text &&
    value.setting.font.family === fontFamily &&
    value.setting.font.weight === fontWeight &&
    value.setting.icon === icon &&
    value.setting.isHidden === isHidden
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  const handleSelectFontFamily = (nextValue: string) => {
    setFontFamily(nextValue);

    if (
      !(fontWeight && fonts[nextValue].weights.includes(fontWeight as Weight))
    ) {
      setFontWeight(fonts[nextValue].defaultWeight!);
    }
  };

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
          <ModalCloseButton ref={initialFocusRef} />
          <ModalBody pb={6}>
            <Stack>
              <Box p={4} bg="rgb(36,36,36)">
                <HStack>
                  {icon !== "none" && (
                    <Center width="24px" height="24px" m="1">
                      {icons[icon as keyof typeof icons].component}
                    </Center>
                  )}

                  <Editable
                    color="white"
                    fontFamily={fontFamily}
                    fontWeight={fontWeight}
                    fontSize="2xl"
                    verticalAlign="text-bottom"
                    placeholder="プレビューテキスト"
                    value={text}
                    onChange={setText}
                    isDisabled={isHidden}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </HStack>
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
                            {Object.entries(fonts).map(([family]) => (
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
                              {fonts[fontFamily]?.weights.map((weight) => (
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
                        {Object.entries(icons).map(([k, v]) => {
                          const radio = getRadioProps({ value: k });
                          return (
                            <WrapItem key={k}>
                              <RadioCircle {...radio}>
                                <Center width="20px" height="20px">
                                  {v.component}
                                </Center>
                              </RadioCircle>
                            </WrapItem>
                          );
                        })}
                      </Wrap>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <FormControl>
                      <HStack>
                        <FormLabel mb="0">非表示にする</FormLabel>
                        <Switch
                          isChecked={isHidden}
                          onChange={(e) =>
                            e.target.checked ? setHidden.on() : setHidden.off()
                          }
                        />
                      </HStack>
                    </FormControl>
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
                onChange({
                  text,
                  setting: {
                    font: { family: fontFamily, weight: fontWeight },
                    icon: icon as keyof typeof icons,
                    isHidden: isHidden,
                  },
                });
                onClose();
              }}
              isDisabled={!isTouched}
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

type RadioCircleProps = {
  children: ReactNode;
};

const RadioCircle = ({ children, ...props }: RadioCircleProps) => {
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
        {children}
      </Circle>
    </Box>
  );
};
