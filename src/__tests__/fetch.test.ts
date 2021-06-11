import { createMocks } from "node-mocks-http";
import handleFetchTwitter from "../pages/api/twitter/[id]";
import handleFetchUnsplash from "../pages/api/unsplash/search";

//replace to msw or react-hooks

describe("/api/twitter/[id]", () => {
  test("returns a data from Twitter", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "Chijidosu",
      },
    });

    await handleFetchTwitter(req, res);

    expect(res._getStatusCode()).toBe(200);
    // console.log(JSON.parse(res._getData()));
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        name: "千々岩",
      })
    );
  });
});

describe("/api/unsplash/search", () => {
  test("returns a data from Unsplash", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        query: "cat",
        page: 1,
      },
    });

    await handleFetchUnsplash(req, res);
    // console.log(JSON.parse(res._getData()));
    expect(res._getStatusCode()).toBe(200);
  });

  test("returns a error from Unsplash", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        query: "cat",
        // page: -500,
      },
    });

    await handleFetchUnsplash(req, res);
    // console.log(JSON.parse(res._getData()));
    expect(res._getStatusCode()).toBe(400);
  });
});
