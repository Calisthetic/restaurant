import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse }  from "next"

export default async function GetTableReserves(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { user_name, user_phone, people_count, message, reserve_at } = req.body
    const result = await sql`INSERT INTO table_reserves (user_name, user_phone, people_count, message, reserve_at)
    VALUES (${user_name}, ${user_phone}, ${people_count}, ${message}, ${reserve_at});`;
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}