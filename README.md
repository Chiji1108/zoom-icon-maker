# Zoom アイコンメーカー

[https://zoom-icon-maker.vercel.app/](https://zoom-icon-maker.vercel.app/)

Storybook はこちら

## TODO

- 直近
  - [ ] Analytics
  - [ ] hide Chromatic Token
  - [ ] Chromatic CI
- 将来
  - SEO
    - [ ] create `robots.txt`
  - i18n
  - Ads
  - Chrome App

## 特記したい使用ライブラリ

- UI
  - [Tailwind UI](https://tailwindui.com/)
- Cropper
  - [react-easy-crop](https://github.com/ricardo-ch/react-easy-crop)
  <!-- - 未使用
  - [classnames](https://www.npmjs.com/package/classnames)
  - [typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules) -->

## 環境構築 (Next.js, Tailwind CSS, Storybook)

- Next.js (& prettier, typescript)
  - create project
    ```bash
    yarn create next-app
    ```
  - add prettier
    ```bash
    yarn add -D prettier
    ```
  - set [`src` Directory](https://nextjs.org/docs/advanced-features/src-directory)
  - [enable Webpack 5](https://nextjs.org/docs/messages/webpack5)
    ```javascript
    // next.config.js
    module.exports = {
      future: {
        webpack5: true,
      },
    };
    ```
  - [set TypeScript](https://nextjs.org/docs/basic-features/typescript)
    ```bash
    touch tsconfig.json
    yarn add -D typescript @types/react
    yarn dev
    ```
  - set `_app.tsx` & `index.tsx`
- [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)

  - add tailwind & init
    ```bash
    yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest
    npx tailwindcss init -p
    ```
  - [enable JIT mode](https://tailwindcss.com/docs/just-in-time-mode) & purge setting

    ```javascript
    // tailwind.config.js
    module.exports = {
      mode: "jit",
      purge: ["./src/**/*.{js,ts,jsx,tsx}"],
      // ...
    };
    ```

  - import tailwindcss
    ```typescript
    // _app.tsx
    import "tailwindcss/tailwind.css";
    ```

- Storybook
  - add [Storybook for Webpack 5](https://storybook.js.org/blog/storybook-for-webpack-5/) & [Addon PostCSS](https://storybook.js.org/addons/@storybook/addon-postcss)
    ```bash
    npx sb init --builder webpack5
    yarn add -D @storybook/addon-postcss
    ```
  - enable PostCSS 8
    ```javascript
    // .storybook/main.js
    module.exports = {
      addons: [
        {
          name: "@storybook/addon-postcss",
          options: {
            postcssLoaderOptions: {
              implementation: require("postcss"),
            },
          },
        },
        // ...
      ],
      // ...
    };
    ```
  - enable TailwindCSS
    ```javascript
    // .storybook/preview.js
    import "tailwindcss/tailwind.css";
    ```
  - check
    ```bash
    yarn storybook
    ```
