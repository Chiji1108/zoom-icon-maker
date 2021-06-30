import { Box, Stack, Flex, Text, Spacer } from "@chakra-ui/react";
import NextImage from "next/image";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import styles from "./Chatbubble.module.css";

type BubbleProps = {
  readonly side: "right" | "left";
};

const Bubble = styled.p<BubbleProps>`
  max-width: 255px;
  word-wrap: break-word;
  margin-bottom: 12px;
  line-height: 24px;
  position: relative;
  padding: 10px 20px;
  border-radius: 25px;

  &:before,
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    height: 25px;
  }

  ${(props) =>
    props.side === "right" &&
    css`
      color: white;
      background: var(--chakra-colors-brand-500);
      align-self: flex-end;

      &:before {
        right: -7px;
        width: 20px;
        background-color: var(--chakra-colors-brand-500);
        border-bottom-left-radius: 16px 14px;
      }

      &:after {
        right: -26px;
        width: 26px;
        background-color: white;
        border-bottom-left-radius: 10px;
      }
    `}

  ${(props) =>
    props.side === "left" &&
    css`
      background: #e5e5ea;
      color: black;
      align-self: flex-start;

      &:before {
        left: -7px;
        width: 20px;
        background-color: #e5e5ea;
        border-bottom-right-radius: 16px;
      }

      &:after {
        left: -26px;
        width: 26px;
        background-color: white;
        border-bottom-right-radius: 10px;
      }
    `}
`;

export type ChatBubbleProps = {
  icon: string;
  children: string;
  side?: "right" | "left";
};

export const ChatBubble = ({
  icon,
  children,
  side = "right",
}: ChatBubbleProps) => {
  switch (side) {
    case "right":
      return (
        <Flex alignItems="center">
          <Spacer />
          <Bubble side={side}>{children}</Bubble>
          <Box ml={3} zIndex={1} overflow="hidden">
            <NextImage
              src={icon}
              width={50}
              height={50}
              className={styles.rounded}
            />
          </Box>
        </Flex>
      );
    case "left":
      return (
        <Flex alignItems="center">
          <Box mr={3} zIndex={1} overflow="hidden">
            <NextImage
              src={icon}
              width={50}
              height={50}
              className={styles.rounded}
            />
          </Box>
          <Bubble side={side}>{children}</Bubble>
          <Spacer />
        </Flex>
      );
  }
};

ChatBubble.displayName = "ChatBubble";
