import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetDishes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sqlresult =
      await sql`SELECT * FROM dish_categories`;
    const obj:any = {sqlresult}
    const result:any = obj.sqlresult.rows
    for (let i = 0; i < result.length; i++) {
      result[i].dishes = sql`SELECT * FROM dishes WHERE category_id=${result[i].id}`
    }
    for (let i = 0; i < result.length; i++) {
      result[i].dishes = {res: await result[i].dishes}.res.rows
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
}