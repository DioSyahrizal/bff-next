import axios from "axios";
import qs from "query-string";
import api from "../../utils/api/common";

const handler = api().get(async (req, res) => {
  const { platform, category } = req.query;
  const url = qs.stringifyUrl({
    url: "https://www.freetogame.com/api/games",
    query: {
      platform,
      category,
    },
  });
  await axios
    .get(url)
    .then((response) => res.status(200).json(response.data))
    .catch((err) =>
      res.status(err.response.status).json({
        message: err.response.statusText,
        status: err.response.status,
      })
    );
});

export default handler;
