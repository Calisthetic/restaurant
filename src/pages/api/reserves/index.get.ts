import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetTableReserves(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result =
      await sql`SELECT table_reserves.id, table_reserves.user_name, table_reserves.user_phone, 
        table_reserves.people_count, table_reserves.reserve_at, table_reserves.message, tables.name AS table_name  
      FROM table_reserves
      INNER JOIN tables ON table_reserves.table_id=tables.id
      WHERE table_reserves.reserve_at > CURRENT_TIMESTAMP
      ORDER BY table_reserves.reserve_at`;
    res.status(200).send({ result }.result.rows);
  } catch (error) {
    res.status(500).send({ error });
  }
}