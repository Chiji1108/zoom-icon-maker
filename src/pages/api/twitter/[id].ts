import type { NextApiRequest, NextApiResponse } from "next";

export type Data = {
  name: string;
  profile_image_url?: string;
  id: string | number;
  username: string;
};

export type ErrorData = {
  message: string;
};

// TODO: profile_image_urlない時

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData | any>
) => {
  const { id } = req.query;
  let response: Response | undefined = undefined;
  try {
    response = await fetch(
      `https://api.twitter.com/2/users/by/username/${id}?${new URLSearchParams({
        "user.fields": "profile_image_url",
      })}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
        },
      }
    );
    if (response.ok) {
      const json = await response.json();

      if (json.data) {
        const data = json.data;
        res.status(200).json({
          ...data,
          profile_image_url: data.profile_image_url.replace("_normal", ""),
        });
      } else if (json.errors) {
        const errors = json.errors;
        res.status(400).json(errors);
      } else {
        res.status(500).end();
      }
    }
  } catch (error) {
    res.status(500).end();
  }
};
