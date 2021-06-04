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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import type { Data as ResponseDataType } from "../../pages/api/twitter/[id]";
import { useFormik } from "formik";
import * as Yup from "yup";

import "core-js/features/promise";
import "core-js/features/set";
import "core-js/features/map";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const errors = await res.json();

    // if (erroredJson && erroredJson)
    // Attach extra info to the error object.
    // error.info = await res.json();
    // error.status = res.status;
    throw new Error(errors[0].detail || "データが取得できませんでした");
  }

  return res.json();
};

export type TwitterInputProps = {
  onChange: (data: ResponseDataType) => void;
};

const TwitterInput = ({ onChange }: TwitterInputProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const [twitterId, setTwitterId] = useState<string>("");
  const [shouldFetch, setFetch] = useBoolean(false);
  const formik = useFormik({
    initialValues: { twitterId: "" },
    validationSchema: Yup.object().shape({
      twitterId: Yup.string()
        .matches(
          /[a-zA-Z_0-9]/,
          "半角英数字(アンダースコア可)で入力してください"
        )
        .min(4, "短すぎます")
        .max(15, "長すぎます")
        .required("必須です"),
    }),
    onSubmit: setFetch.on,
  });

  const [prevError, setPrevError] = useState<Error | null>(null);
  const { data, error } = useSWR<ResponseDataType>(
    shouldFetch ? `/api/twitter/${formik.values.twitterId}` : null,
    fetcher
  );

  useEffect(() => {
    if (!shouldFetch) return;
    if (data) {
      setPrevError(null);
      onChange(data);
      onClose();
      setFetch.off();
    }
  }, [data]);

  useEffect(() => {
    // console.log(error);

    if (error) {
      setPrevError(error);
      setFetch.off();
    }
  }, [error]);

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
          <ModalHeader>Twitterからデータを入力</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl
              isInvalid={
                (!!prevError && !shouldFetch) ||
                (!!formik.errors.twitterId && formik.touched.twitterId)
              }
            >
              {/* <FormLabel>
                Twitter APIを利用してデータを取得し自動入力します
              </FormLabel> */}
              <InputGroup>
                <InputLeftAddon>@</InputLeftAddon>
                <Input
                  placeholder="Twitter ID"
                  id="twitterId"
                  name="twitterId"
                  value={formik.values.twitterId}
                  onChange={formik.handleChange}
                />
              </InputGroup>
              <FormErrorMessage>
                {(prevError && prevError.message) || formik.errors.twitterId}
              </FormErrorMessage>

              <FormHelperText>
                Twitter APIを利用してデータを取得し自動入力します
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => formik.handleSubmit()}
              isLoading={shouldFetch}
              loadingText="取得中..."
              isDisabled={formik.values.twitterId === ""}
            >
              取得
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TwitterInput;
TwitterInput.displayName = "TwitterInput";
