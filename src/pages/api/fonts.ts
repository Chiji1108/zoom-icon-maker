import type { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export const GOOGLE_FONTS_URL =
  "https://www.googleapis.com/webfonts/v1/webfonts";

export type OriginalResponse =
  | {
      kind: string;
      items: {
        family: string;
        variants: string[];
        subsets: ("japanese" | string)[];
        version: string;
        lastModified: string;
        files: {
          [key: string]: string;
        };
        category: string;
        kind: string;
      }[];
    }
  | {
      error: {
        code: number;
        message: string;
        errors: {
          message: string;
          domain: string;
          reason: string;
        }[];
        status: string;
      };
    };

export type TransformedResponse = {
  family: string;
  variants: string[];
}[];

export const DEFAULT_FONTS = [
  {
    family: "sans-serif",
    variants: ["normal", "bold"],
  },
  {
    family: "serif",
    variants: ["normal", "bold"],
  },
];

export const transform = (data: OriginalResponse): TransformedResponse => {
  if ("error" in data) {
    throw new Error(data.error.message);
  } else {
    return [
      ...DEFAULT_FONTS,
      ...data.items
        .filter((i) => i.subsets.includes("japanese"))
        .map(({ family, variants }) => ({ family, variants })),
    ];
  }
};

// export default async (
//   req: NextApiRequest,
//   res: NextApiResponse<TransformedResponse>
// ) => {
//   await axios
//     .get<OriginalResponse>(URL, {
//       params: {
//         key: process.env.GOOGLE_API_KEY,
//         sort: "popularity",
//       },
//     })
//     .then(({ data }) => res.status(200).json(transform(data)))
//     .catch(() => res.status(500).end());
// };
