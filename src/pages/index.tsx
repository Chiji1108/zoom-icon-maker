import {
  Button,
  Box,
  Center,
  Stack,
  VStack,
  Container,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Heading,
  Text,
  Link,
  HStack,
  Grid,
  Flex,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import {
  LineShareButton,
  TwitterShareButton,
  FacebookShareButton,
  TwitterIcon,
  LineIcon,
  FacebookIcon,
} from "react-share";
import { DownloadIcon } from "@chakra-ui/icons";
import { createContext, useCallback, useState } from "react";
import { Form } from "../components/Form";
import NextImage from "next/image";
// import { ImageSelector } from "../components/ImageSelector";

import { ChatBubble } from "../components/ChatBubble";
import { GetStaticProps, InferGetStaticPropsType } from "next";

import axios from "axios";
import {
  TransformedResponse,
  OriginalResponse,
  transform,
  GOOGLE_FONTS_URL,
} from "./api/fonts";
import { useEffect } from "react";

const SHARE_URL = "https://zoom-icon-maker.vercel.app";

const addFonts = async (fonts: TransformedResponse) => {
  await Promise.all(
    fonts.map(({ family, files }) => {
      return Promise.all(
        Object.entries(files).map(([key, value]) => {
          let font: FontFace;
          if (key === "normal") {
            font = new FontFace(family, `url(${value})`);
          } else {
            font = new FontFace(family, `url(${value})`, { weight: key });
          }
          return (async () => {
            await font.load();
            document.fonts.add(font);
          })();
        })
      );
    })
  );
};

export const FontContext = createContext<TransformedResponse>([
  {
    family: "Noto Sans JP",
    files: {
      "100":
        "http://fonts.gstatic.com/s/notosansjp/v28/-F6ofjtqLzI2JPCgQBnw7HFQoggM-FNthvIU.otf",
      "300":
        "http://fonts.gstatic.com/s/notosansjp/v28/-F6pfjtqLzI2JPCgQBnw7HFQaioq1H1hj-sNFQ.otf",
      normal:
        "http://fonts.gstatic.com/s/notosansjp/v28/-F62fjtqLzI2JPCgQBnw7HFowAIO2lZ9hg.otf",
      "500":
        "http://fonts.gstatic.com/s/notosansjp/v28/-F6pfjtqLzI2JPCgQBnw7HFQMisq1H1hj-sNFQ.otf",
      "700":
        "http://fonts.gstatic.com/s/notosansjp/v28/-F6pfjtqLzI2JPCgQBnw7HFQei0q1H1hj-sNFQ.otf",
      "900":
        "http://fonts.gstatic.com/s/notosansjp/v28/-F6pfjtqLzI2JPCgQBnw7HFQQi8q1H1hj-sNFQ.otf",
    },
  },
  {
    family: "Noto Serif JP",
    files: {
      "200":
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn77YHs72GKoTvER4Gn3b5eMZBaPRkgfU8fEwb0.otf",
      "300":
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn77YHs72GKoTvER4Gn3b5eMZHKMRkgfU8fEwb0.otf",
      normal:
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn7mYHs72GKoTvER4Gn3b5eMXNikYkY0T84.otf",
      "500":
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn77YHs72GKoTvER4Gn3b5eMZCqNRkgfU8fEwb0.otf",
      "600":
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn77YHs72GKoTvER4Gn3b5eMZAaKRkgfU8fEwb0.otf",
      "700":
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn77YHs72GKoTvER4Gn3b5eMZGKLRkgfU8fEwb0.otf",
      "900":
        "http://fonts.gstatic.com/s/notoserifjp/v8/xn77YHs72GKoTvER4Gn3b5eMZFqJRkgfU8fEwb0.otf",
    },
  },
]);

export const getStaticProps = async () => {
  const { data } = await axios.get<OriginalResponse>(GOOGLE_FONTS_URL, {
    params: {
      key: process.env.GOOGLE_FONTS_API_KEY,
      sort: "popularity",
    },
  });
  const fonts = transform(data);
  return {
    props: { fonts },
  };
};

export default function Home({
  fonts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [result, setResult] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    addFonts(fonts);
  }, []);

  return (
    <FontContext.Provider value={fonts}>
      <Container maxW="xl" centerContent>
        <Heading as="h1" mt={12} mb={6} textAlign="center" lineHeight="none">
          <Text
            as="span"
            color="brand.500"
            fontSize="7xl"
            fontWeight="extrabold"
          >
            Zoom
          </Text>
          <br />
          アイコンメーカー
        </Heading>
        <VStack as="main" mt={6}>
          <Form>
            {({ handleGenerate, isLoading, error }) => (
              <VStack>
                <Button
                  colorScheme="brand"
                  onClick={async () => {
                    const r = await handleGenerate();
                    if (!error && r) {
                      setResult(r);
                      onOpen();
                    }
                  }}
                  isLoading={isLoading}
                  loadingText="生成中..."
                  margin={4}
                >
                  画像を生成！
                </Button>
                {error && (
                  <Alert status="error">
                    <AlertIcon />
                    {error.message}
                  </Alert>
                )}
              </VStack>
            )}
          </Form>
        </VStack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>保存</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={0}>
              <Image src={result} />

              <Stack mt={6}>
                <Center>
                  <a href={result} download="zoom_icon.png">
                    <Button colorScheme="brand">
                      ダウンロード <DownloadIcon />
                    </Button>
                  </a>
                </Center>
                <Center>
                  <Text>または画像長押しで保存</Text>
                </Center>
              </Stack>

              <Share />
            </ModalBody>
            <ModalFooter />
          </ModalContent>
        </Modal>

        <Box h="16" />
        <About />

        <Box as="footer" color="gray" fontSize="sm" mt={10} mb={2}>
          <Text textAlign="center">
            created by{" "}
            <Link href="https://twitter.com/Chijidosu">@Chijidosu</Link>
          </Text>
          <Text>※Zoomは、Zoomビデオコミュニケーションズの商標です。</Text>
        </Box>
      </Container>
    </FontContext.Provider>
  );
}

const About = () => (
  <Stack mt="6" spacing={6}>
    <Heading textAlign="center" fontSize="2xl">
      何ができるの？
    </Heading>
    <Text textAlign="center">🎉 Zoom用のアイコンが作れます！ 🎉</Text>
    <Box h={1} />
    <Stack>
      <ChatBubble icon="/about/nuko.png" side="right">
        あー、Zoomのアイコンが見辛いにゃ...
      </ChatBubble>
      <ChatBubble icon="/about/chiji.png" side="left">
        わかる
      </ChatBubble>
    </Stack>

    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      alignItems="center"
      // maxW="sm"
      alignSelf="center"
    >
      <Text>何も設定しないと...</Text>
      <NextImage
        src="/about/bad_demo.png"
        width={320}
        height={180}
        alt="bad demo"
      />
      <Text>画像を設定しても...</Text>
      <NextImage
        src="/about/bad_demo_image.png"
        width={320}
        height={180}
        alt="bad demo with image"
      />
    </Grid>
    <Stack>
      <ChatBubble icon="/about/nuko.png" side="right">
        誰が誰だか分からんにゃ！！
      </ChatBubble>
      <ChatBubble icon="/about/chiji.png" side="left">
        わかる
      </ChatBubble>
    </Stack>
    <Stack>
      <Text>そこで！</Text>
      <Text>
        このZoomアイコンメーカーで生成した画像をプロフィール画像に設定すると...
      </Text>
    </Stack>

    <Flex justify="center" wrap={"wrap-reverse"}>
      <Box maxW={["unset", "2xs"]} mx={1}>
        <NextImage src="/about/good_demo.png" width={320} height={180} />
      </Box>
      <Box maxW={["unset", "2xs"]} mx={1}>
        <NextImage src="/about/good_demo_role.png" width={320} height={180} />
      </Box>
      <Box maxW={["unset", "2xs"]} mx={1}>
        <NextImage src="/about/good_demo_sns.png" width={320} height={180} />
      </Box>
    </Flex>
    <Text>こんなサムネイルにできちゃいます！</Text>
    <Stack>
      <ChatBubble icon="/about/nuko.png" side="right">
        新歓zoomで大活躍にゃん！
      </ChatBubble>
      <ChatBubble icon="/about/chiji.png" side="left">
        わかる
      </ChatBubble>
    </Stack>
    <Text>さあ作ってみましょう！</Text>
    <Button
      alignSelf="center"
      colorScheme="brand"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      トップに戻る
    </Button>
    <Share />
  </Stack>
);

const Share = () => (
  <Center mt={6}>
    <VStack>
      <Text fontSize="xs" color="gray">
        ↓ あなたのZoom会議で流行らせちゃう!? ↓
      </Text>

      <HStack>
        <TwitterShareButton url={SHARE_URL}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LineShareButton url={SHARE_URL}>
          <LineIcon size={40} round />
        </LineShareButton>
        <FacebookShareButton url={SHARE_URL}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </HStack>
    </VStack>
  </Center>
);
