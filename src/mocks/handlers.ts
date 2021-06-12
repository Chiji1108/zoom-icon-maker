import { rest } from "msw";

// import type { Data } from "../pages/api/twitter/[id]";

export const handlers = [
  rest.get("/api/twitter/:id", (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({
        id: "mock id",
        name: "mock name",
        username: id,
        profile_image_url: "https://source.unsplash.com/daily",
      })
    );
  }),
  rest.get("/api/unsplash/search", (req, res, ctx) => {
    const { query, page } = req.params
    return res(
      ctx.status(200),
      ctx.json([
        {
          total_pages: 10,
          images: {
            src: {
              regular: "https://source.unsplash.com/random/1600x900",
              thumb: "https://source.unsplash.com/random/1600x900",
            },
            alt: "unsplash",
            width: 1600,
            height: 900,
            author: {
              name: "mock",
              link: "https://source.unsplash.com/random/1600x900",
            },
            download_url: "https://source.unsplash.com/random/1600x900",
          }
        },
        {
          total_pages: 10,
          images: {
            src: {
              regular: "https://source.unsplash.com/random/1600x900",
              thumb: "https://source.unsplash.com/random/1600x900",
            },
            alt: "unsplash",
            width: 1600,
            height: 900,
            author: {
              name: "mock",
              link: "https://source.unsplash.com/random/1600x900",
            },
            download_url: "https://source.unsplash.com/random/1600x900",
          }
        },
      ])
    )
  })
];
