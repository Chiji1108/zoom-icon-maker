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
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useQuery } from "react-query";

import type {
  NormalizedResponse,
  SuccessResponse,
} from "../../../pages/api/twitter/[id]";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "core-js/features/promise";
import "core-js/features/set";
import "core-js/features/map";

// const TwitterContext = createContext();

// const useTwitterContext = () => {
//   return useContext(TwitterContext);
// }

export type TwitterProps = {
  onChange: (data: SuccessResponse) => void;
  children: ({
    form,
    button,
  }: {
    form: ReactNode;
    button: ReactNode;
  }) => ReactNode;
};

const fetchProfileById = (twitterId: string) =>
  axios
    .get<NormalizedResponse>(`/api/twitter/${twitterId}`)
    .then(({ data }) => {
      if ("errors" in data) throw new Error(data.errors.join("\n"));
      return data;
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

  const { isLoading, data, error, refetch } = useQuery<SuccessResponse, Error>(
    ["profile", query],
    () => fetchProfileById(query),
    {
      enabled: false,
      retry: false,
    }
  );

  useEffect(() => {
    if (!query) return;
    refetch();
  }, [query]);

  useEffect(() => {
    if (!data) return;
    onChange(data);
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
      {/* <TwitterContext.Provider
        value={{
          isInvalid: !!errors.twitterId || !!error,
          register: register("twitterId"),
          errorMessage: errors.twitterId?.message || error?.message,
          handleFetch: handleSubmit((data) => {
            setQuery(data.twitterId);
          }),
          isLoading: isLoading,
          isDisabled: !!errors.twitterId,
        }}
      ></TwitterContext.Provider> */}
      {children({
        form: (
          <FormControl isInvalid={!!errors.twitterId || !!error}>
            <FormLabel>Twitter ID</FormLabel>
            <InputGroup>
              <InputLeftAddon>@</InputLeftAddon>
              <Input
                placeholder="Twitter IDを入力"
                {...register("twitterId")}
              />
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
            colorScheme="brand"
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

// const TwitterForm = () => {
//   const {} = useTwitterContext()
// }
