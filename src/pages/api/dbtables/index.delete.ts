import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function DeleteTables(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result =
      await sql`SELECT * FROM information_schema.tables WHERE table_schema = 'public';`;

    const obj:any = { result }
    await sql`DROP TABLE table_reserves;`;
    await sql`DROP TABLE tables;`;
    await sql`DROP TABLE recipes;`;
    await sql`DROP TABLE ingredients;`;
    await sql`DROP TABLE dishes;`;
    await sql`DROP TABLE dish_categories;`;
    await sql`DROP TABLE users;`;
    await sql`DROP TABLE roles;`;
    // for (let i = 0; i < obj.result.rows.length; i++) {
    //   const table_name = obj.result.rows[i].table_name;
    //   console.log(obj.result.rows[i].table_name)
    //   await sql`DROP TABLE tables;`;
    // }
    res.status(200).send({result: "Successfully deleted"});
  } catch (error) {
    res.status(500).send({ error });
  }
}