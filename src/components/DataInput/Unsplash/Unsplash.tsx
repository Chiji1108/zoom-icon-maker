import { ReactNode, useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import {
  Image as ImageType,
  Response,
  UTM,
} from "../../../pages/api/unsplash/search";
import image from "next/image";
import Gallery, { RenderImageProps } from "react-photo-gallery";
import InfiniteScroll from "react-infinite-scroll-component";

import axios from "axios";
import { useInfiniteQuery } from "react-query";

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

function useUnsplash(query: string) {
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
}

export type UnsplashProps = {
  children: ({
    form,
    button,
  }: {
    form: ReactNode;
    button: ReactNode;
  }) => ReactNode;
};

const fetchImages = (params: {query: string, page: number}) =>
  axios.get("/api/unsplash/search", { params });

  const schema = Yup.
export const Unsplash = () => {
  //   const [shouldFetch, setFetch] = useBoolean(false);
  // const [value, setValue] = useState<string>("cat");
  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setQuery(value), 500);
  //   return () => clearTimeout(timeOutId);
  // }, [value]);
  const [query, setQuery] = useState<string>("cat");

  const {     data,
  error,
     isFetching,
     isFetchingNextPage,
     fetchNextPage,
     hasNextPage,} = useInfiniteQuery("images", ({pageParam}) => fetchImages({query, page: pageParam}), {retry: false});
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
  return (
    <Stack>
      <FormControl isInvalid={!!error}>
        <FormLabel>画像を検索</FormLabel>
        <Input
          placeholder="画像を検索"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <FormErrorMessage>{error && error.message}</FormErrorMessage>

        <FormHelperText>
          <Link href={`https://unsplash.com/?${UTM}`}>Unsplash</Link>
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
      <InfiniteScroll
        dataLength={images.length}
        next={loadMore}
        hasMore={!isReachingEnd}
        loader={
          <Stack>
            <Skeleton height="40" />
            <Skeleton height="40" />
            <Skeleton height="40" />
          </Stack>
        }
      >
        <Gallery
          //   onClick={(event, photos) => console.log(photos)}
          photos={images.map((image) => ({
            src: image.urls?.thumb!,
            alt: image.alt_description!,
            width: image.width!,
            height: image.height!,
          }))}
          renderImage={(props) => (
            <ImageWithAuthor
              {...props}
              data={images.map((image) => ({
                author: {
                  name: image.user?.name!,
                  url: image.user?.links.html!,
                },
                download_location: image.links?.download_location!,
              }))}
            />
          )}
        />
      </InfiniteScroll>
      {/* )} */}
    </Stack>
  );
};

type ImageWithAuthorProps = {
  data: {
    author: {
      name: string;
      url: string;
    };
    download_location: string;
  }[];
} & RenderImageProps;

const ImageWithAuthor = ({
  index,
  photo,
  margin,
  direction,
  top,
  left,
  data,
}: ImageWithAuthorProps) => {
  const { src, alt, width, height, key } = photo;
  return (
    <Box
      margin="2px"
      pos={"relative"}
      key={key}
      cursor="pointer"
      _active={{
        boxShadow: "0 0 0 2px var(--chakra-colors-blue-500)",
      }}
      _hover={{ filter: "brightness(1.15)" }}
    >
      <Image src={src} alt={alt} width={width} height={height} />
      <Box
        pos="absolute"
        left={0}
        right={0}
        bottom={0}
        p={4}
        bgGradient="linear(to-b, rgba(0,0,0,0), rgba(0,0,0,1))"
      >
        <Text color="white">
          <Link href={data[index].author.url + "?" + UTM}>
            {data[index].author.name}
          </Link>
        </Text>
      </Box>
    </Box>
  );
};
