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
import { ReactNode, useEffect, useState } from "react";

import axios from "axios";
import { useQuery } from "react-query";

import type { NormalizedResponse } from "../../../pages/api/twitter/[id]";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "core-js/features/promise";
import "core-js/features/set";
import "core-js/features/map";

export type TwitterProps = {
  onChange: (data: NormalizedResponse) => void;
  children: ({
    form,
    button,
  }: {
    form: ReactNode;
    button: ReactNode;
  }) => ReactNode;
};

const fetchProfileById = (twitterId: string) =>
  axios.get<NormalizedResponse>(`/api/twitter/${twitterId}`).then((res) => {
    if ("errors" in res.data) throw new Error(res.data.errors.join("\n"));
    return res.data;
  });

const schema = Yup.object().shape({
  twitterId: Yup.string()
    .matches(/[a-zA-Z_0-9]/, "半角英数字(アンダースコア可)で入力してください")
    .min(4, "短すぎます")
    .max(15, "長すぎます")
    .required("必須です"),
});

export const Twitter = ({ onChange, children }: TwitterProps) => {
  const [query, setQuery] = useState<string>("");

  const { isLoading, data, error, refetch } = useQuery<
    NormalizedResponse,
    Error
  >(["profile", query], () => fetchProfileById(query), {
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (query) {
      refetch();
    }
  }, [query]);

  useEffect(() => {
    if (data) {
      onChange(data);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ twitterId: string }>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      {children({
        form: (
          <FormControl isInvalid={!!errors.twitterId || !!error}>
            <FormLabel>Twitter ID</FormLabel>
            <InputGroup>
              <InputLeftAddon>@</InputLeftAddon>
              <Input placeholder="Twitter ID" {...register("twitterId")} />
            </InputGroup>
            <FormErrorMessage>
              {errors.twitterId?.message || error?.message}
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
            onClick={handleSubmit((data) => {
              setQuery(data.twitterId);
            })}
            isLoading={isLoading}
            loadingText="取得中..."
            isDisabled={!!errors.twitterId}
          >
            取得
          </Button>
        ),
      })}
    </>
  );
};
