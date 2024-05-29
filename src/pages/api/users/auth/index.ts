import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"
import PostUserAuth from './index.post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      PostUserAuth(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}