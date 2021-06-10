import type { NextApiHandler } from "next";

import axios from "axios";

const UTM = new URLSearchParams({
  utm_source: "zoom_icon_maker",
  utm_medium: "referral",
});

type APIResponse =
  | {
      total: number;
      total_pages: number;
      results: {
        id: string;
        alt_description: string;
        width: number;
        height: number;
        urls: {
          regular: string;
          thumb: string;
        };
        links: {
          download_location: string;
        };
        user: {
          name: string;
          links: {
            html: string;
          };
        };
      }[];
    }
  | {
      errors: string[];
    };

export type NormalizedResponse =
  | {
      src: {
        regular: string;
        thumb: string;
      };
      alt: string;
      width: number;
      height: number;
      author: {
        name: string;
        link: string;
      };
      download_url: string;
    }[]
  | { errors: string[] };

const transformData: (data: APIResponse) => NormalizedResponse = (data) => {
  if ("errors" in data) {
    return data;
  } else {
    return data.results.map((d) => ({
      src: { regular: d.urls.regular, thumb: d.urls.thumb },
      alt: d.alt_description,
      width: d.width,
      height: d.height,
      author: {
        name: d.user.name,
        link: d.user.links.html + UTM,
      },
      download_url: d.links.download_location + UTM,
    }));
  }
};

const handler: NextApiHandler<NormalizedResponse> = async (req, res) => {
  const { query, page } = req.query;
  await axios
    .get<APIResponse>("https://api.unsplash.com/search/photos", {
      params: { query, page },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
    })
    .then(({ data }) => {
      res.status(200).json(transformData(data));
    })
    .catch(() => res.status(500).end());
};

// const h: NextApiHandler<Response> = async (req, res) => {
//   const { query, page } = req.query;
//   // TODO: queryが空白だったりのバリデーション
//   const params = new URLSearchParams({
//     query: query as string,
//     page: page as string,
//   });
//   const response = await fetch(
//     `https://api.unsplash.com/search/photos?${params}`,
//     {
//       headers: {
//         Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
//       },
//     }
//   );
//   const data: Response = await response.json();

//   // console.log(typeof data);

//   if (response.ok) {
//     if (data.errors) {
//       res.status(400).json(data);
//     } else {
//       res.status(200).json(data);
//     }
//   } else {
//     res.status(500).json({ errors: [response.statusText] });
//   }
// };

export default handler;
