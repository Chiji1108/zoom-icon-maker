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
import { useState } from "react";
import { AvatarInput } from "../components/AvatarInput";
import { Form } from "../components/Form";
import NextImage from "next/image";
// import { ImageSelector } from "../components/ImageSelector";

// import anime from "animejs/lib/anime.es.js";
import anime from "animejs";

import { ChatBubble } from "../components/ChatBubble";

const SHARE_URL = "https://zoom-icon-maker.vercel.app";

export default function Home() {
  const [result, setResult] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
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

              <Center mt={6}>
                <VStack>
                  <Text fontSize="xs" color="gray">
                    ↓ あなたのZoom会議で流行らしちゃう!? ↓
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
    </>
  );
}

const About = () => (
  <Stack mt="6" spacing={6}>
    <Heading textAlign="center" fontSize="2xl">
      何ができるの？
    </Heading>
    <Text textAlign="center">🎉 Zoomのサムネイルを改善します！ 🎉</Text>
    <Box h={1} />
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
        ダサいにゃん！
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
        見やすいにゃん！
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
        const scrollElement =
          window.document.scrollingElement ||
          window.document.body ||
          window.document.documentElement;
        anime({
          targets: scrollElement,
          scrollTop: 0,
          duration: 500,
          easing: "easeInOutQuad",
        });
      }}
    >
      トップに戻る
    </Button>
  </Stack>
);
