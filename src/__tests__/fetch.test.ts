import { createMocks } from "node-mocks-http";
import handleFetch from "../pages/api/twitter/[id]";

describe("/api/twitter/[id]", () => {
  test("returns a data from Twitter", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        id: "Chijidosu",
      },
    });

    await handleFetch(req, res);

    expect(res._getStatusCode()).toBe(200);
    // console.log(JSON.parse(res._getData()));
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        name: "千々岩",
      })
    );
  });
});
