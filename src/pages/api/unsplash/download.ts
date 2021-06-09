import { NextApiHandler } from "next";

type Response = {
  url?: string;
  errors?: string[];
};

const handler: NextApiHandler<Response> = async (req, res) => {
  const { url } = req.query;

  const response = await fetch(url as string, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });
  const data: Response = await response.json();

  if (response.ok) {
    if (data.errors) {
      res.status(400).json(data);
    } else {
      res.status(200).json(data);
    }
  } else {
    res.status(500).json({ errors: [response.statusText] });
  }
};

export default handler;
