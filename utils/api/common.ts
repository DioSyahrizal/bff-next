import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const api = () => {
  return nc<NextApiRequest, NextApiResponse>({
    onError: (err: AxiosError, req, res, next) => {
      res.status(err.response?.status ?? 500).json(err.response?.data);
    },
  });
};

export default api;
