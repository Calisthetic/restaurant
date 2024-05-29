import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"
import PostTables from './index.post';
import DeleteTables from './index.delete';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      try {
        const result =
          await sql`SELECT * FROM information_schema.tables WHERE table_schema = 'public';`;
        res.status(200).send({ result }.result.rows);
      } catch (error) {
        res.status(500).send({ error });
      }
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