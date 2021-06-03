import Image from "next/image";

type Icon = {
  [key: string]: {
    component: JSX.Element;
    type: "svg" | "png";
    url: string;
  };
};

const icons: Icon = {
  email: {
    component: (
      <Image
        src="/icons/email.svg"
        alt="email"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/email.svg",
  },
  twitter: {
    component: (
      <Image
        src="/icons/twitter.svg"
        alt="twitter"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/twitter.svg",
  },
  instagram: {
    component: (
      <Image
        src="/icons/instagram.png"
        alt="instagram"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "png",
    url: "/icons/instagram.png",
  },
  facebook: {
    component: (
      <Image
        src="/icons/facebook.png"
        alt="facebook"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "png",
    url: "/icons/facebook.png",
  },
  github: {
    component: (
      <Image
        src="/icons/github.png"
        alt="github"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "png",
    url: "/icons/github.png",
  },
  discord: {
    component: (
      <Image
        src="/icons/discord.svg"
        alt="discord"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/discord.svg",
  },
  youtube: {
    component: (
      <Image
        src="/icons/youtube.png"
        alt="youtube"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "png",
    url: "/icons/youtube.png",
  },
  twitch: {
    component: (
      <Image
        src="/icons/twitch.svg"
        alt="twitch"
        layout="fill"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/twitch/svg",
  },
};

export default icons;
