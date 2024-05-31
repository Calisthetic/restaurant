import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse }  from "next"

export default async function PostTableReserves(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user_name, user_phone, people_count, message, reserve_at, table_id } = req.body
    const result = await sql`INSERT INTO table_reserves (user_name, user_phone, people_count, message, reserve_at, table_id)
    VALUES (${user_name}, ${user_phone}, ${people_count}, ${message}, ${reserve_at}, ${table_id});`;
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}