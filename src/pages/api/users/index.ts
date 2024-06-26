import { NextApiRequest, NextApiResponse } from "next"
import GetUsers from "./index.get";
import PostUsers from "./index.post";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetUsers(req, res)
      break;
    case 'POST':
      PostUsers(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}