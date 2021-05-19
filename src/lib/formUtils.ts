//TODO: サイズ削除
// import simpleIcons from "simple-icons";

import { createImage } from "./canvasUtils";

type Data = {
  src: string;
  name: string;
  bio: string;
  setting: Setting;
};

interface Setting {
  font: string;
  enabledBio: boolean;
  bioIcon: string;
}

import { fabric } from "fabric";

export const generate = async ({ src, name, bio, setting }: Data) => {
  const canvasEl = document.createElement("canvas");
  canvasEl.width = 1024;
  canvasEl.height = 1024;
  const canvas = new fabric.StaticCanvas(canvasEl);
  const imageEl = await createImage(src);
  const image = new fabric.Image(imageEl);
  canvas.add(image);
  canvas.renderAll();

  return new Promise<string>((resolve) => {
    canvasEl.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/png");
  });
};
