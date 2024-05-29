import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      break;
    case 'POST':
      break;
    case 'DELETE':
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}