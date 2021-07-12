import Image from "next/image";

const icons = {
  email: {
    component: (
      <Image
        src="/icons/email.svg"
        alt="email"
        width="100%"
        height="100%"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/email.svg",
  },
  website: {
    component: (
      <Image
        src="/icons/website.svg"
        alt="website"
        width="100%"
        height="100%"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/website.svg",
  },
  twitter: {
    component: (
      <Image
        src="/icons/twitter.svg"
        alt="twitter"
        width="100%"
        height="100%"
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
        width="100%"
        height="100%"
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
        width="100%"
        height="100%"
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
        width="100%"
        height="100%"
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
        width="100%"
        height="100%"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/discord.svg",
  },
  twitch: {
    component: (
      <Image
        src="/icons/twitch.svg"
        alt="twitch"
        width="100%"
        height="100%"
        objectFit="contain"
      />
    ),
    type: "svg",
    url: "/icons/twitch/svg",
  },
};

export default icons;
