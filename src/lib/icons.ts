export interface Icon {
  title: string;
  path: string;
  hex: string;
}

export default [
  {
    title: "email",
    path:
      "M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z",
    hex: "ffffff",
  },
  require("simple-icons/icons/twitter"),
  require("simple-icons/icons/instagram"),
  require("simple-icons/icons/facebook"),
  require("simple-icons/icons/line"),
  {
    ...require("simple-icons/icons/github"),
    hex: "ffffff",
  },
  ,
  require("simple-icons/icons/youtube"),
  {
    ...require("simple-icons/icons/tiktok"),
    hex: "ffffff",
  },

  require("simple-icons/icons/twitch"),
  require("simple-icons/icons/vim"),
  require("simple-icons/icons/gnuemacs"),
  require("simple-icons/icons/undertale"),
] as Array<Icon>;

//TODO: add license credit
