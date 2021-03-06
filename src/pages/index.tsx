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

import example from "public/akasa.jpeg";

import axios from "axios";
import {
  TransformedResponse,
  OriginalResponse,
  transform,
  GOOGLE_FONTS_URL,
  DEFAULT_FONTS,
} from "./api/fonts";
import { useEffect } from "react";
import { BASE_URL, DESCRIPTION } from "src/meta.config";

export const FontContext = createContext<TransformedResponse>(DEFAULT_FONTS);

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
    const WebFont = require("webfontloader");
    WebFont.load({
      google: {
        families: fonts.map(
          (font) => `${font.family}:100,200,300,400,500,600,700,800,900`
        ),
      },
    });
  }, []);

  return (
    <FontContext.Provider value={fonts}>
      <Container maxW="xl" centerContent>
        <Stack
          mt={24}
          mb={24}
          alignSelf={["center", "flex-start"]}
          direction={["column", "row"]}
          spacing={[8, 16]}
        >
          <Stack alignSelf="center" spacing={6}>
            <Heading
              as="h1"
              lineHeight={1}
              fontWeight="extrabold"
              fontFamily="Noto Sans JP"
            >
              <Text color="brand.500" fontSize={["7xl", "6xl"]}>
                Zoom
              </Text>
              <Text fontSize={["4xl", "2xl"]} whiteSpace="nowrap">
                ????????????????????????
              </Text>
            </Heading>
            <Heading as="h2" color="gray.500" fontSize={"sm"}>
              {DESCRIPTION}
            </Heading>
          </Stack>

          <Center>
            <Box maxW={"280px"}>
              <NextImage src={example} alt="example" />
            </Box>
          </Center>
        </Stack>

        <VStack as="main" mt={18} mb={16}>
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
                  loadingText="?????????..."
                  margin={4}
                >
                  ??????????????????
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
            <ModalHeader>??????</ModalHeader>
            <ModalCloseButton />
            <ModalBody p={0}>
              <Image src={result} />

              <Stack mt={6}>
                <Center>
                  <a href={result} download="zoom_icon.png">
                    <Button colorScheme="brand">
                      ?????????????????? <DownloadIcon />
                    </Button>
                  </a>
                </Center>
                <Center>
                  <Text>?????????????????????????????????</Text>
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
          <Text>???Zoom??????Zoom?????????????????????????????????????????????????????????</Text>
        </Box>
      </Container>
    </FontContext.Provider>
  );
}

const About = () => (
  <Stack mt="6" spacing={6}>
    <Heading textAlign="center" fontSize="2xl">
      ?????????????????????
    </Heading>
    <Text textAlign="center">???? Zoom???????????????????????????????????? ????</Text>
    <Box h={1} />
    <Stack>
      <ChatBubble icon="/about/nuko.png" side="right">
        ?????????Zoom?????????????????????????????????...
      </ChatBubble>
      <ChatBubble icon="/about/chiji.png" side="left">
        ?????????
      </ChatBubble>
    </Stack>

    <Grid
      templateColumns="repeat(2, 1fr)"
      gap={6}
      alignItems="center"
      // maxW="sm"
      alignSelf="center"
    >
      <Text>????????????????????????...</Text>
      <NextImage
        src="/about/bad_demo.png"
        width={320}
        height={180}
        alt="bad demo"
      />
      <Text>????????????????????????...</Text>
      <NextImage
        src="/about/bad_demo_image.png"
        width={320}
        height={180}
        alt="bad demo with image"
      />
    </Grid>
    <Stack>
      <ChatBubble icon="/about/nuko.png" side="right">
        ???????????????????????????????????????
      </ChatBubble>
      <ChatBubble icon="/about/chiji.png" side="left">
        ?????????
      </ChatBubble>
    </Stack>
    <Stack>
      <Text>????????????</Text>
      <Text>
        ??????Zoom??????????????????????????????????????????????????????????????????????????????????????????...
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
    <Text>???????????????????????????????????????????????????</Text>
    <Stack>
      <ChatBubble icon="/about/nuko.png" side="right">
        ??????zoom????????????????????????
      </ChatBubble>
      <ChatBubble icon="/about/chiji.png" side="left">
        ?????????
      </ChatBubble>
    </Stack>
    <Text>?????????????????????????????????</Text>
    <Button
      alignSelf="center"
      colorScheme="brand"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      ??????????????????
    </Button>
    <Share />
  </Stack>
);

const Share = () => (
  <Center mt={6}>
    <VStack>
      <Text fontSize="xs" color="gray">
        ??? ????????????Zoom??????????????????????????????!? ???
      </Text>

      <HStack>
        <TwitterShareButton url={BASE_URL}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <LineShareButton url={BASE_URL}>
          <LineIcon size={40} round />
        </LineShareButton>
        <FacebookShareButton url={BASE_URL}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
      </HStack>
    </VStack>
  </Center>
);
