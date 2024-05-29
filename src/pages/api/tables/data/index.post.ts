import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostTablesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const dishes = [
    {
      name: 'Ничего',
      cook_time: 10,
    },
    {
      name: 'Окрошка',
      cook_time: 20,
    },
    {
      name: 'Картошка',
      cook_time: 10,
    },
  ]
  try {
    for (let i = 0; i < dishes.length; i++) {
      await sql`INSERT INTO dishes (name, cook_time) VALUES (${dishes[i].name}, ${dishes[i].cook_time});`;
    }
    await sql``;
    const result = await sql``;
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}