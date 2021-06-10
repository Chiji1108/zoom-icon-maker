import type { NextApiHandler } from "next";

import axios from "axios";

type APIResponse =
  | {
      data: {
        name: string;
        profile_image_url: string;
        id: string | number;
        username: string;
      };
    }
  | {
      errors: {
        parameter: string;
        resource_id: string;
        value: string;
        detail: string;
        title: string;
        resource_type: string;
        type: string;
      }[];
    };

export type NormalizedResponse =
  | {
      name: string;
      username: string;
      profile_image_url: string;
    }
  | { errors: string[] };

const transformData: (data: APIResponse) => NormalizedResponse = (data) => {
  if ("errors" in data) {
    return { errors: data.errors.map((e) => e.detail) };
  } else if ("data" in data) {
    return {
      ...data.data,
      profile_image_url: data.data.profile_image_url.replace("_normal", ""),
    };
  } else {
    throw new Error("blank data");
  }
};

const handler: NextApiHandler<NormalizedResponse> = async (req, res) => {
  const { id } = req.query;
  await axios
    .get<APIResponse>(`https://api.twitter.com/2/users/by/username/${id}`, {
      params: { "user.fields": "profile_image_url" },
      headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` },
    })
    .then(({ data }) => {
      res.status(200).json(transformData(data));
    })
    .catch(() => res.status(500).end());
};

export default handler;
