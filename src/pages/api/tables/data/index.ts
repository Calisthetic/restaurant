import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"
import PostTablesData from './index.post';
import DeleteTablesData from './index.delete';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      const pets = await sql`SELECT * FROM dishes;`;
      res.status(200).json({ pets });
      break;
    case 'POST':
      PostTablesData(req, res)
      break;
    case 'DELETE':
      DeleteTablesData(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}