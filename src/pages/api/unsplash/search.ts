import type { NextApiHandler } from "next";

export const UTM = new URLSearchParams({
  utm_source: "zoom_icon_maker",
  utm_medium: "referral",
});

export type Response = {
  total?: number;
  total_pages?: number;
  results?: Image[];
  errors?: string[];
};

export type Image = {
  id?: string;
  alt_description?: string;
  width?: number;
  height?: number;
  urls?: {
    regular?: string;
    thumb?: string;
  };
  links?: {
    download_location?: string;
  };
  user?: {
    name: string;
    links: {
      html: string;
    };
  };
};

const handler: NextApiHandler<Response> = async (req, res) => {
  const { query, page } = req.query;
  // TODO: queryが空白だったりのバリデーション
  const params = new URLSearchParams({
    query: query as string,
    page: page as string,
  });
  const response = await fetch(
    `https://api.unsplash.com/search/photos?${params}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    }
  );
  const data: Response = await response.json();

  // console.log(typeof data);

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
