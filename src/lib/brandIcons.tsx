import Image from "next/image";

const icons: Icon[] = [
  {
    name: "discord",
    type: "svg",
    url: "/icons/discord.svg",
    compoent: (
      <Image src="/icons/discord.svg" alt="discord" width={24} height={24} />
    ),
  },
];

type Icon = {
  name: string;
  type: "png" | "svg";
  url: string;
  compoent: JSX.Element;
};

export default icons;
