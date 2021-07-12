import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useBoolean,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  DarkMode,
  LightMode,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";

import { Twitter } from "./Twitter/Twitter";
// import type { Data as ResponseDataType } from "../../pages/api/twitter/[id]";

import type { SuccessResponse } from "../../pages/api/twitter/[id]";
import { Unsplash } from "./Unsplash";

export type Data = {
  src?: string;
  name?: string;
  bio?: string;
};

export type DataInputProps = {
  onChange: (data: Data) => void;
};

const TwitterIcon = (props: any) => (
  <Icon viewBox="0 0 248 204" {...props}>
    <path
      fill="currentColor"
      d="M221.95,51.29c0.15,2.17,0.15,4.34,0.15,6.53c0,66.73-50.8,143.69-143.69,143.69v-0.04
		C50.97,201.51,24.1,193.65,1,178.83c3.99,0.48,8,0.72,12.02,0.73c22.74,0.02,44.83-7.61,62.72-21.66
		c-21.61-0.41-40.56-14.5-47.18-35.07c7.57,1.46,15.37,1.16,22.8-0.87C27.8,117.2,10.85,96.5,10.85,72.46c0-0.22,0-0.43,0-0.64
		c7.02,3.91,14.88,6.08,22.92,6.32C11.58,63.31,4.74,33.79,18.14,10.71c25.64,31.55,63.47,50.73,104.08,52.76
		c-4.07-17.54,1.49-35.92,14.61-48.25c20.34-19.12,52.33-18.14,71.45,2.19c11.31-2.23,22.15-6.38,32.07-12.26
		c-3.77,11.69-11.66,21.62-22.2,27.93c10.01-1.18,19.79-3.86,29-7.95C240.37,35.29,231.83,44.14,221.95,51.29z"
    />
  </Icon>
);

export const TwitterInput = ({ onChange }: DataInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = useCallback((data: SuccessResponse) => {
    onChange({
      src: data.profile_image_url,
      name: data.name,
      bio: data.username,
    });
    onClose();
  }, []);

  return (
    <>
      <IconButton
        icon={<TwitterIcon />}
        aria-label="open data input modal"
        onClick={onOpen}
        isRound
        variant="ghost"
        colorScheme="whiteAlpha"
        fontSize="20"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>データ入力</ModalHeader>
          <ModalCloseButton />
          <Twitter onChange={handleChange}>
            {(twitter) => (
              <>
                <ModalBody>{twitter.form}</ModalBody>

                <ModalFooter>
                  {twitter.button}
                  <Button variant="ghost" onClick={onClose}>
                    キャンセル
                  </Button>
                </ModalFooter>
              </>
            )}
          </Twitter>
        </ModalContent>
      </Modal>
    </>
  );
};

const PhotoIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z"
    />
  </Icon>
);

export const UnsplashInput = ({ onChange }: DataInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleChange = useCallback((src: string) => {
    onChange({ src });
    onClose();
  }, []);

  return (
    <>
      <IconButton
        icon={<PhotoIcon />}
        aria-label="open data input modal"
        onClick={() => {
          onOpen();
        }}
        isRound
        variant="ghost"
        colorScheme="whiteAlpha"
        fontSize="24"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>データ入力</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Unsplash onChange={handleChange} />
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DataInput = ({ onChange }: DataInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChangeTwitter = useCallback((data: SuccessResponse) => {
    onChange({
      src: data.profile_image_url,
      name: data.name,
      bio: data.username,
    });
    onClose();
  }, []);

  const handleChangeUnsplash = useCallback((src: string) => {
    onChange({ src });
    onClose();
  }, []);

  return (
    <>
      <IconButton
        icon={<SearchIcon />}
        aria-label="open data input modal"
        onClick={() => {
          setTabIndex(0);
          onOpen();
        }}
        isRound
        variant="ghost"
        colorScheme="whiteAlpha"
        fontSize="20"
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>データ入力</ModalHeader>
          <ModalCloseButton />
          <Twitter onChange={handleChangeTwitter}>
            {(twitter) => (
              <>
                <ModalBody>
                  <Tabs isLazy onChange={setTabIndex} tabIndex={tabIndex}>
                    <TabList>
                      <Tab>Twitter</Tab>
                      <Tab>Unsplash</Tab>
                    </TabList>

                    <TabPanels>
                      <TabPanel>{twitter.form}</TabPanel>
                      <TabPanel>
                        <Unsplash onChange={handleChangeUnsplash} />
                      </TabPanel>
                    </TabPanels>
                  </Tabs>
                </ModalBody>

                <ModalFooter>
                  {tabIndex === 0 ? twitter.button : null}
                  <Button variant="ghost" onClick={onClose}>
                    キャンセル
                  </Button>
                </ModalFooter>
              </>
            )}
          </Twitter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DataInput;
DataInput.displayName = "DataInput";
