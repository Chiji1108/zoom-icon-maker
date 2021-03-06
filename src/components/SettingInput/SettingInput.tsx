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
  Collapse,
  Fade,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Heading,
  Portal,
} from "@chakra-ui/react";
import { SettingsIcon, ChevronDownIcon } from "@chakra-ui/icons";
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
import { useContext } from "react";
import { FontContext } from "../../pages";

export type SettingInputProps = {
  value: Setting;
  onChange: (nextValue: Setting) => void;
  advanced: boolean;
};

export type Setting = {
  text: string;
  setting: {
    font: {
      family: string;
      weight: string;
    };
    icon: "none" | keyof typeof icons;
    isHidden: boolean;
  };
};

const SettingInput = ({ value, onChange, advanced }: SettingInputProps) => {
  const fonts = useContext(FontContext);
  const [text, setText] = useState<string>(value.text);
  const [fontFamily, setFontFamily] = useState(value.setting.font.family);
  const [fontWeight, setFontWeight] = useState(value.setting.font.weight);
  const {
    getRootProps,
    getRadioProps,
    value: icon,
    setValue: setIcon,
  } = useRadioGroup({
    name: "icon",
    defaultValue: value.setting.icon,
  });
  const [isHidden, setHidden] = useBoolean(value.setting.isHidden);

  const group = getRootProps();

  useEffect(() => setText(value.text), [value.text]);
  useEffect(() => setFontFamily(value.setting.font.family), [
    value.setting.font.family,
  ]);
  useEffect(() => setFontWeight(value.setting.font.weight), [
    value.setting.font.weight,
  ]);
  useEffect(() => setIcon(value.setting.icon), [value.setting.icon]);
  useEffect(() => (value.setting.isHidden ? setHidden.on() : setHidden.off()), [
    value.setting.isHidden,
  ]);

  const isTouched = !(
    value.text === text &&
    value.setting.font.family === fontFamily &&
    value.setting.font.weight === fontWeight &&
    value.setting.icon === icon &&
    value.setting.isHidden === isHidden
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <IconButton
        isRound
        aria-label="open setting"
        icon={<SettingsIcon />}
        onClick={onOpen}
        variant="ghost"
        colorScheme="whiteAlpha"
        fontSize="20"
      />

      <Modal
        initialFocusRef={initialFocusRef}
        isOpen={isOpen}
        onClose={onClose}
        // scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>??????</ModalHeader>
          <ModalCloseButton ref={initialFocusRef} />
          <ModalBody pb={6}>
            <Stack spacing={6}>
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
                    placeholder="Zoom????????????????????????"
                    value={text}
                    onChange={setText}
                    isDisabled={isHidden}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </HStack>
              </Box>

              <Stack>
                <FormControl>
                  <FormLabel fontWeight="bold">????????????</FormLabel>
                  <Box p={1}>
                    <Menu isLazy>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        fontFamily={fontFamily}
                        w="100%"
                        textAlign="start"
                      >
                        {fontFamily}
                      </MenuButton>

                      <MenuList mb="32" maxH="xs" overflowY="auto">
                        <MenuOptionGroup
                          value={fontFamily}
                          type="radio"
                          onChange={(e) => {
                            setFontFamily(Array.isArray(e) ? e[0] : e);
                            setFontWeight(
                              fonts.find((f) => f.family === e)?.variants[0] ||
                                "regular"
                            );
                          }}
                        >
                          {fonts.map(({ family }) => (
                            <MenuItemOption
                              fontFamily={family}
                              value={family}
                              key={family}
                            >
                              {family}
                            </MenuItemOption>
                          ))}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </Box>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight="bold">??????</FormLabel>
                  <Box p={1}>
                    <Menu isLazy>
                      <MenuButton
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        fontFamily={fontFamily}
                        fontWeight={fontWeight}
                        w="100%"
                        textAlign="start"
                      >
                        {fontWeight}
                      </MenuButton>

                      <MenuList mb="32" maxH="xs" overflowY="auto">
                        <MenuOptionGroup
                          value={fontWeight}
                          type="radio"
                          onChange={(v) =>
                            setFontWeight(Array.isArray(v) ? v[0] : v)
                          }
                        >
                          {fonts
                            .find((f) => f.family === fontFamily)
                            ?.variants.map((weight) => (
                              <MenuItemOption
                                key={weight}
                                fontFamily={fontFamily}
                                fontWeight={weight}
                                value={weight}
                              >
                                {weight}
                              </MenuItemOption>
                            ))}
                        </MenuOptionGroup>
                      </MenuList>
                    </Menu>
                  </Box>
                </FormControl>

                {advanced && (
                  <FormControl>
                    <FormLabel fontWeight="bold">????????????</FormLabel>
                    <Box p={1}>
                      <Stack {...group}>
                        <Radio
                          {...getRadioProps({ value: "none" })}
                          colorScheme="brand"
                        >
                          ???????????????
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
                    </Box>
                  </FormControl>
                )}
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
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
              ??????
            </Button>
            <Button onClick={onClose}>???????????????</Button>
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
          borderColor: "brand.500",
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
