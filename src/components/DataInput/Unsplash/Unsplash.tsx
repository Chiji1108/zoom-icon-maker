import { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import * as Yup from "yup";
import "core-js/features/promise";
import "core-js/features/set";
import "core-js/features/map";
import { useBoolean } from "@chakra-ui/hooks";
import {
  FormControl,
  InputGroup,
  Input,
  InputLeftAddon,
  FormHelperText,
  FormErrorMessage,
  Link,
  Image,
  FormLabel,
  Skeleton,
  Stack,
  Box,
  Text,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  NormalizedResponse,
  SuccessResponse,
  UNSPLASH_WITH_UTM,
} from "../../../pages/api/unsplash/search";
import image from "next/image";
import Gallery, { RenderImageProps } from "react-photo-gallery";
// import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";
import { useInfiniteQuery } from "react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useInView } from "react-intersection-observer";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { ImageEditor } from "../../ImageEditor";

import { CropInfo } from "../../ImageEditor/ImageEditor";
import { getCroppedImg } from "../../../lib/canvasUtils";

// const fetcher = (url: string) =>
//   fetch(url)
//     .then((r) => r.json())
//     .then((r) => {
//       if (r == 1) {
//         throw new Error("エラーが発生しました");
//       } else {
//         return r;
//       }
//     });
// .then((r: Response) => {
//   if (r.errors) {
//     throw new Error(r.errors.join("\n"));
//   } else {
//     return r;
//   }
// })
// .catch((err) => {
//   throw new Error(err.message);
// });

// function useUnsplash(query: string) {
// const { data, error, size, setSize } = useSWRInfinite<Response, Error>(
//   (pageIndex, previousPageData) => {
//     if (!query || query == "") return null;
//     if (
//       previousPageData &&
//       previousPageData.total_pages &&
//       previousPageData.total_pages < pageIndex
//     )
//       return null; // 最後に到達した
//     //   console.log(`/api/unsplash/search?query=${query}&page=${pageIndex}`);
//     return `/api/unsplash/search?query=${query}&page=${pageIndex}`;
//   },
//   fetcher
// );
// dataがresults持ってる
// results
// TODO: data.flatMap is not a function
// console.log("data: ", data, "error: ", error, "size: ", size);
// const images: ImageType[] = data ? data.flatMap((d) => d.results!) : [];
// const isLoadingInitialData = !data && !error;
// const isLoadingMore =
//   isLoadingInitialData ||
//   (size > 0 && data && typeof data[size - 1] === "undefined");
// const isEmpty = images.length === 0;
// const isReachingEnd =
//   isEmpty ||
//   (data &&
//     data[0] &&
//     data[0].total_pages &&
//     data[0].total_pages < data.length);
// //   const isRefreshing = isValidating && data && data.length === size;
// return {
//   images,
//   error,
//   isLoadingInitialData,
//   isLoadingMore,
//   isEmpty,
//   isReachingEnd,
//   size,
//   setSize,
// };
// }

export type UnsplashProps = {
  onChange: (src: string) => void;
  // children: ({
  //   form,
  //   button,
  // }: {
  //   form: ReactNode;
  //   button: ReactNode;
  // }) => ReactNode;
};

const fetchImages = async (params: { query: string; page: number }) => {
  // console.log(params);
  const { data } = await axios.get<NormalizedResponse>("/api/unsplash/search", {
    params,
  });
  if ("errors" in data) throw new Error(data.errors.join("\n"));
  return data;
};

const schema = Yup.object().shape({
  query: Yup.string().required("必須です"),
});
export const Unsplash = ({ onChange }: UnsplashProps) => {
  //   const [shouldFetch, setFetch] = useBoolean(false);
  // const [value, setValue] = useState<string>("cat");
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setQuery(value), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [value]);
  const [query, setQuery] = useState<string>("");

  const {
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<SuccessResponse, Error>(
    ["images", query],
    ({ pageParam = 1 }) => fetchImages({ query, page: pageParam }),
    {
      getNextPageParam: (last, pages) => {
        if (!last) return undefined;
        if (last.total_pages <= pages.length) return undefined;
        return pages.length + 1;
      },
      enabled: !!query,
      retry: false,
    }
  );

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<{ query: string }>({
    resolver: yupResolver(schema),
  });

  // console.log(watch("query"));

  useEffect(() => {
    // console.log("watch");
    const timeOutId = setTimeout(
      handleSubmit((d) => setQuery(d.query)),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [watch("query")]);

  const { ref, inView } = useInView();

  useEffect(() => {
    if (!inView) return;
    if (isFetchingNextPage) return;
    if (!hasNextPage) return;
    fetchNextPage();
  }, [inView]);

  // useEffect(() => {
  //   if (query) {
  //     fetchNextPage();
  //   }
  // }, [query]);
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setQuery(value), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [value]);
  // const {
  //   images,
  //   error,
  //   isLoadingInitialData,
  //   isLoadingMore,
  //   isReachingEnd,
  //   size,
  //   setSize,
  // } = useUnsplash(query);

  // const loadMore = () => setSize(size + 1);

  const [originalSrc, setOriginalSrc] = useState<string>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setLoading] = useBoolean(false);
  const [cropInfo, setCropInfo] = useState<CropInfo>();

  //TODO: リファクタリング ImageEdiorにこういうのまとめる

  const handleGenerate = async () => {
    setLoading.on();
    const result = await getCroppedImg(
      originalSrc!,
      cropInfo!.area,
      cropInfo!.rotation
    );
    onChange(result);
    // console.log(result);
    setLoading.off();
    onClose();
  };

  const handleSelect = ({
    download_url,
    src,
  }: {
    download_url: string;
    src: string;
  }) => {
    axios.get("/api/unsplash/download", { params: { url: download_url } });
    setOriginalSrc(src);
    onOpen();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>メディアを編集</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ImageEditor src={originalSrc!} onComplete={setCropInfo} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={handleGenerate}
              isLoading={isLoading}
              loadingText="生成中..."
              isDisabled={!originalSrc}
            >
              適用
            </Button>
            <Button variant="ghost" onClick={onClose}>
              キャンセル
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack>
        <FormControl isInvalid={!!errors.query || !!error}>
          <FormLabel>画像を選択</FormLabel>
          <Input
            placeholder="検索ワードを入力"
            defaultValue="cat"
            {...register("query")}
          />
          <FormErrorMessage>
            {errors.query?.message || error?.message}
          </FormErrorMessage>

          <FormHelperText>
            <Link href={UNSPLASH_WITH_UTM} isExternal>
              Unsplash
              <ExternalLinkIcon />
            </Link>
            から画像を取得しています
          </FormHelperText>
        </FormControl>
        {/* {value === "" ? null : isLoadingMore ? (
        <Stack>
          <Skeleton height="40" />
          <Skeleton height="40" />
          <Skeleton height="40" />
        </Stack>
      ) : ( */}

        <Gallery
          //   onClick={(event, photos) => console.log(photos)}
          photos={
            data?.pages
              ?.flatMap((page) => page.images)
              .map(({ src, alt, width, height }) => ({
                src: src.thumb,
                alt,
                width,
                height,
              })) || []
          }
          renderImage={(props) => (
            <CustomImage
              {...props}
              data={
                data?.pages
                  ?.flatMap((page) => page.images)
                  .map(({ author, download_url, src }) => ({
                    author,
                    download_url,
                    src: src.regular,
                  })) || []
              }
              handleSelect={handleSelect}
            />
          )}
        />

        {/* <Button
        onClick={() => fetchNextPage()}
        isLoading={isFetching}
        isDisabled={!hasNextPage}
      >
        hoge
      </Button> */}
        <Box ref={ref}>
          {isFetching && (
            <Stack>
              <Skeleton height="40" />
              <Skeleton height="40" />
              <Skeleton height="40" />
            </Stack>
          )}
        </Box>
      </Stack>
    </>
  );
};

type CustomImageProps = {
  data: {
    author: {
      name: string;
      link: string;
    };
    download_url: string;
    src: string;
  }[];
  handleSelect: ({
    download_url,
    src,
  }: {
    download_url: string;
    src: string;
  }) => void;
} & RenderImageProps;

const CustomImage = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  data,
  handleSelect,
}: CustomImageProps) => {
  const { src, alt, width, height, key } = photo;

  return (
    <Fragment key={key}>
      <Box
        margin="2px"
        pos="relative"
        cursor="pointer"
        _active={{
          boxShadow: "0 0 0 2px var(--chakra-colors-brand-500)",
        }}
        _hover={{ filter: "brightness(1.15)" }}
        onClick={() =>
          handleSelect({
            download_url: data[index].download_url,
            src: data[index].src,
          })
        }
      >
        <Image src={src} alt={alt} width={width} height={height} />
        <Box
          pos="absolute"
          left={0}
          right={0}
          bottom={0}
          p={3}
          bgGradient="linear(to-b, rgba(0,0,0,0), rgba(0,0,0,0.8))"
          // bg="rgba(0,0,0,0.5)"
        >
          <Text color="white">
            <Link href={data[index].author.link} isExternal>
              {data[index].author.name}
              <ExternalLinkIcon />
            </Link>
          </Text>
        </Box>
      </Box>
    </Fragment>
  );
};
