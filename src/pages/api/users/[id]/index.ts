import { NextApiRequest, NextApiResponse } from "next"
import GetUser from './index.get';
import DeleteUsers from "./index.delete";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetUser(req, res)
      break;
    case 'DELETE':
      DeleteUsers(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}