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
import Head from "next/head";
import { useState } from "react";
import { AvatarInput } from "../components/AvatarInput";
import { Form } from "../components/Form";
// import { ImageSelector } from "../components/ImageSelector";

const SHARE_URL = "https://zoom-icon-maker.vercel.app";

export default function Home() {
  const [result, setResult] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Zoomアイコンメーカー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxW="xl" centerContent>
        <Heading as="h1" mt={12} mb={6} textAlign="center" lineHeight="none">
          <Text as="span" color="blue" fontSize="7xl" fontWeight="extrabold">
            Zoom
          </Text>
          <br />
          アイコンメーカー
        </Heading>
        <VStack as="main" mt="6">
          <Form>
            {({ handleGenerate, isLoading, error }) => (
              <VStack>
                <Button
                  colorScheme="blue"
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
                  <Link href={result} download="zoom_icon.png">
                    <Button colorScheme="blue">
                      ダウンロード <DownloadIcon />
                    </Button>
                  </Link>
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

        {/* <About /> */}

        <Center as="footer" color="gray" fontSize="sm" textAlign="center">
          <Stack>
            <Text>
              created by{" "}
              <Link href="https://twitter.com/Chijidosu">@Chijidosu</Link>
            </Text>
            <Text>※Zoomは、Zoomビデオコミュニケーションズの商標です。</Text>
          </Stack>
        </Center>
      </Container>
    </>
  );
}

const About = () => (
  <Box textAlign="center" m="6">
    <Heading fontSize="2xl">何ができるの？</Heading>
  </Box>
);
