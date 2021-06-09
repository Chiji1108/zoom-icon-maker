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
import { useEffect, useState } from "react";
import useSWR from "swr";

import { useFormik } from "formik";

import { Twitter } from "./Twitter/Twitter";
import type { Data as ResponseDataType } from "../../pages/api/twitter/[id]";
import { Unsplash } from "./Unsplash";

export type DataInputProps = {
  onChange: (data: ResponseDataType) => void;
};

const DataInput = ({ onChange }: DataInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChangeTwitter = (data: ResponseDataType) => {
    onChange(data);
    onClose();
  };

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <IconButton
        icon={<span className="material-icons">input</span>}
        aria-label="open data input modal"
        onClick={onOpen}
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
                  <Tabs isLazy onChange={setTabIndex}>
                    <TabList>
                      <Tab>Twitter</Tab>
                      {/* <Tab>Unsplash</Tab> */}
                    </TabList>

                    <TabPanels>
                      <TabPanel>{twitter.form}</TabPanel>
                      {/* <TabPanel>
                        <Unsplash />
                      </TabPanel> */}
                    </TabPanels>
                  </Tabs>
                </ModalBody>

                <ModalFooter>
                  {tabIndex === 0 && twitter.button}
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
