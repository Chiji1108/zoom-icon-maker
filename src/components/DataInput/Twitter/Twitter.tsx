import {
  useBoolean,
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  Button,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { ReactNode, useEffect, useState } from "react";
import useSWR from "swr";
import * as Yup from "yup";
import "core-js/features/promise";
import "core-js/features/set";
import "core-js/features/map";

import type { Data as ResponseDataType } from "../../../pages/api/twitter/[id]";

//TODO: プロフィールイメージがないデータに対しての挙動

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

export type TwitterProps = {
  onChange: (data: ResponseDataType) => void;
  children: ({
    form,
    button,
  }: {
    form: ReactNode;
    button: ReactNode;
  }) => ReactNode;
};

export const Twitter = ({ onChange, children }: TwitterProps) => {
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
      setFetch.off();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setPrevError(error);
      setFetch.off();
    }
  }, [error]);

  return (
    <>
      {children({
        form: (
          <FormControl
            isInvalid={
              (!!prevError && !shouldFetch) ||
              (!!formik.errors.twitterId && formik.touched.twitterId)
            }
          >
            <FormLabel>Twitter ID</FormLabel>
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
        ),
        button: (
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
        ),
      })}
    </>
  );
};
