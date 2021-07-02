import type { Setting } from "../components/SettingInput";

import { createImage } from "./canvasUtils";

import icons from "./icons";

// if (typeof window === "undefined") return;
// import WebFont from "webfontloader";

export const generate = async (
  src: string | undefined,
  name: Setting,
  bio: Setting
) => {
  if (!src) throw new Error("画像が選択されていません");

  //TODO: windows linux
  const type = "macOS";

  const hideBio = bio.setting.isHidden || bio.text === "";

  /* 
  name.text === "" ? 660 :

  name.text === ""
      ? (CANVAS_SIZE - IMAGE_SIZE) / 2
      : 
  */

  const CANVAS_SIZE = 1024;
  const BG_COLOR = type === "macOS" ? "rgb(36,36,36)" : "rgb(24,24,24)";
  const IMAGE_SIZE = name.text === "" && hideBio ? 800 : hideBio ? 630 : 600;
  const IMAGE_Y =
    name.text === "" && hideBio
      ? (CANVAS_SIZE - IMAGE_SIZE) / 2
      : hideBio
      ? 78
      : 72;
  const NAME_SIZE = hideBio ? 144 : 140;
  const NAME_Y = hideBio ? 780 : 725;
  const BIO_SIZE = 50;
  const BIO_Y = 900;
  const ICON_SIZE = BIO_SIZE + 4;
  const ICON_MARGIN = 15;

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("ブラウザが対応していません");

  // bg
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  // src
  ctx.save();
  ctx.translate((CANVAS_SIZE - IMAGE_SIZE) / 2, IMAGE_Y);
  ctx.beginPath();
  ctx.arc(IMAGE_SIZE / 2, IMAGE_SIZE / 2, IMAGE_SIZE / 2, 0, 2 * Math.PI);
  ctx.clip();
  const img = await createImage(src);
  ctx.drawImage(img, 0, 0, IMAGE_SIZE, IMAGE_SIZE);
  ctx.restore();

  // const fonts = [
  //   {
  //     family: name.setting.font.family,
  //     weight: name.setting.font.weight,
  //   },
  //   {
  //     family: bio.setting.font.family,
  //     weight: bio.setting.font.weight,
  //   },
  // ];
  // const WebFont = require("webfontloader");

  // WebFont.load({
  //   google: {
  //     families: fonts
  //       .filter(({ family }) => family !== "serif" && family !== "sans-serif")
  //       .map(({ family, weight }) => `${family}:${weight}`),
  //   },
  // });

  // text
  ctx.textBaseline = "top";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  // name
  try {
    const nameFont = `${name.setting.font.weight} ${NAME_SIZE}px '${name.setting.font.family}'`;
    await document.fonts.load(nameFont, name.text);
    ctx.font = nameFont;
  } catch (error) {
    const nameFont = `${NAME_SIZE}px '${name.setting.font.family}'`;
    await document.fonts.load(nameFont, name.text);
    ctx.font = nameFont;
  }
  ctx.fillText(name.text, CANVAS_SIZE / 2, NAME_Y);

  // bio
  if (!hideBio) {
    try {
      const bioFont = `${bio.setting.font.weight} ${BIO_SIZE}px '${bio.setting.font.family}'`;
      await document.fonts.load(bioFont, bio.text);
      ctx.font = bioFont;
    } catch (error) {
      const bioFont = `${BIO_SIZE}px '${bio.setting.font.family}'`;
      await document.fonts.load(bioFont, bio.text);
      ctx.font = bioFont;
    }
    if (bio.setting.icon != "none") {
      ctx.save();
      ctx.translate(
        (CANVAS_SIZE -
          (ctx.measureText(bio.text).width + ICON_MARGIN + ICON_SIZE)) /
          2,
        BIO_Y
      );
      ctx.textAlign = "start";
      ctx.fillText(bio.text, ICON_MARGIN + ICON_SIZE, 0);
      const icon = await createImage(icons[bio.setting.icon].url);
      ctx.drawImage(icon, 0, 0, ICON_SIZE, ICON_SIZE);
      ctx.restore();
    } else {
      ctx.fillText(bio.text, CANVAS_SIZE / 2, BIO_Y);
    }
  }

  return new Promise<string>((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file));
    }, "image/png");
  });
};
// //TODO: サイズ削除

// // import simpleIcons from "simple-icons";

// import { createImage } from "./canvasUtils";
// import type { Setting } from "../components/SettingInput";

// type Data = {
//   src?: string;
//   name: Setting;
//   bio: Setting;
// };

// // import { fabric } from "fabric";

// export const generate = async ({ src, name, bio }: Data) => {
//   //TODO: src がnullだったら
//   if (!src) {
//     throw new Error("src is not defined!");
//   }

//   const canvasEl = document.createElement("canvas");
//   canvasEl.width = 1024;
//   canvasEl.height = 1024;
//   const canvas = new fabric.StaticCanvas(canvasEl);

//   const bg = new fabric.Rect({
//     left: 0,
//     top: 0,
//     width: canvas.getWidth(),
//     height: canvas.getHeight(),
//     fill: "rgb(36,36,36)",
//   });
//   canvas.add(bg);

//   const imageEl = await createImage(src);
//   const image = new fabric.Image(imageEl, {
//     originX: "center",
//     originY: "center",
//     top: canvas.getHeight() / 2 - 130,
//     left: canvas.getWidth() / 2,
//     clipPath: new fabric.Circle({
//       radius: imageEl.width / 2,
//       originX: "center",
//       originY: "center",
//     }),
//   });
//   image.scaleToWidth(600);
//   image.scaleToHeight(600);
//   canvas.add(image);

//   const textName = new fabric.Text(name.text, {
//     fill: "#ffffff",
//     fontSize: 120,
//     fontFamily: name.setting.font.family,
//     fontWeight: name.setting.font.weight,
//     originX: "center",
//     originY: "center",
//     left: canvas.getWidth() / 2,
//     top: canvas.getHeight() / 2 + 300,
//   });
//   canvas.add(textName);

//   const textBio = new fabric.Text(bio.text, {
//     fill: "#ffffff",
//     fontSize: 40,
//     fontFamily: bio.setting.font.family,
//     fontWeight: bio.setting.font.weight,
//     originX: "center",
//     originY: "center",
//     left: canvas.getWidth() / 2,
//     top: canvas.getHeight() / 2 + 420,
//   });
//   canvas.add(textBio);

//   canvas.renderAll();

//   return new Promise<string>((resolve) => {
//     canvasEl.toBlob((file) => {
//       resolve(URL.createObjectURL(file));
//     }, "image/png");
//   });
// };
