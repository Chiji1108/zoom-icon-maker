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
  //TODO: src がnullだったら
  const canvasEl = document.createElement("canvas");
  canvasEl.width = 1024;
  canvasEl.height = 1024;
  const canvas = new fabric.StaticCanvas(canvasEl);

  const bg = new fabric.Rect({
    left: 0,
    top: 0,
    width: canvas.getWidth(),
    height: canvas.getHeight(),
    fill: "rgb(36,36,36)",
  });
  canvas.add(bg);

  const imageEl = await createImage(src);
  const image = new fabric.Image(imageEl, {
    originX: "center",
    originY: "center",
    top: canvas.getHeight() / 2 - 130,
    left: canvas.getWidth() / 2,
    clipPath: new fabric.Circle({
      radius: imageEl.width / 2,
      originX: "center",
      originY: "center",
    }),
  });
  image.scaleToWidth(600);
  image.scaleToHeight(600);
  canvas.add(image);

  const textName = new fabric.Text(name, {
    fill: "#ffffff",
    fontSize: 120,
    fontFamily: setting.font,
    originX: "center",
    originY: "center",
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2 + 300,
  });
  canvas.add(textName);

  const textBio = new fabric.Text(bio, {
    fill: "#ffffff",
    fontSize: 40,
    fontFamily: setting.font,
    originX: "center",
    originY: "center",
    left: canvas.getWidth() / 2,
    top: canvas.getHeight() / 2 + 420,
  });
  canvas.add(textBio);

  canvas.renderAll();

  return new Promise<string>((resolve) => {
    canvasEl.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/png");
  });
};