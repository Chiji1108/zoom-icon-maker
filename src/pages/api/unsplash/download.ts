import { NextApiHandler } from "next";

import axios from "axios";

const handler: NextApiHandler = async (req, res) => {
  const { url } = req.query;

  await axios
    .get(`${url}`, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    })
    .then(({ status }) => res.status(status).end())
    .catch(() => res.status(500).end());
};

export default handler;
