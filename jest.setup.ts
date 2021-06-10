// import { server } from "./src/mocks/server";

import dotenv from "dotenv";
import path from "path";

// import "whatwg-fetch";
// import "unfetch/polyfill";

// import "isomorphic-fetch";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

// global.fetch = fetchPolyfill;
// Object.assign(global.fetch, fetchPolyfill);

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
