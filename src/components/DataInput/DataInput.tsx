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
} from "@chakra-ui/react";
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
        icon={<span className="material-icons">input</span>}
        aria-label="open data input modal"
        onClick={() => {
          setTabIndex(0);
          onOpen();
        }}
        // borderRadius="full"
        variant="ghost"
        colorScheme="whiteAlpha"
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
