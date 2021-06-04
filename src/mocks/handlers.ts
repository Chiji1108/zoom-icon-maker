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
];
