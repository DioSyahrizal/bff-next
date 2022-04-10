import axios from "axios";
import { NextApiHandler } from "next";
import qs from "query-string";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { platform, category } = req.query;
    const url = qs.stringifyUrl({
      url: "https://www.freetogame.com/api/games",
      query: {
        platform,
        category,
      },
    });
    // try {
    //   const response = await fetch(url).then((resp) => resp.json());
    //   res.status(200).json(response);
    // } catch (err: unknown) {
    //   res.status(401).json({
    //     message: "Not Found",
    //     status: 401,
    //   });
    // }
    try {
      const response = await axios.get(url);
      res.status(200).json(response.data);
    } catch (err: any) {
      res.status(err.response.status).json({
        message: err.response.statusText,
        status: err.response.status,
      });
    }
    // await axios
    //   .get(url)
    //   .then((response) => res.status(200).json(response.data))
    //   .catch((err) =>
    //     res.status(err.response.status).json({
    //       message: err.response.statusText,
    //       status: err.response.status,
    //     })
    //   );
  } else {
    res.status(405);
    res.end();
  }
};

export default handler;
