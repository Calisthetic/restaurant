import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"
import GetTableReserves from './index.get';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTableReserves(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}