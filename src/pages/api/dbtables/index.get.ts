import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTables(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result =
      await sql`SELECT * FROM information_schema.tables WHERE table_schema = 'public';`;
    res.status(200).send({ result }.result.rows);
  } catch (error) {
    res.status(500).send({ error });
  }
}