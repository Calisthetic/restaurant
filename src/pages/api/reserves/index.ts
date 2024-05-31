import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"
import GetTableReserves from './index.get';
import PostTableReserves from './index.post';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTableReserves(req, res)
      break;
    case 'POST':
      PostTableReserves(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}