import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"
import PostTables from './index.post';
import DeleteTables from './index.delete';
import GetTables from './index.get';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetTables(req, res)
      break;
    case 'POST':
      PostTables(req, res)
      break;
    case 'DELETE':
      DeleteTables(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}