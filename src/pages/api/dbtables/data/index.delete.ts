import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function DeleteTablesData(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result =
      await sql`SELECT * FROM information_schema.tables WHERE table_schema = 'public';`;

    const obj:any = { result }
    await sql`DELETE FROM table_reserves;`;
    await sql`DELETE FROM tables;`;
    await sql`DELETE FROM recipes;`;
    await sql`DELETE FROM ingredients;`;
    await sql`DELETE FROM dishes;`;
    await sql`DELETE FROM dish_categories;`;
    await sql`DELETE FROM users;`;
    await sql`DELETE FROM roles;`;
    // for (let i = 0; i < obj.result.rows.length; i++) {
    //   const table_name = obj.result.rows[i].table_name;
    //   console.log(obj.result.rows[i].table_name)
    //   await sql`DELETE FROM tables;`;
    // }
    res.status(200).send({result: "Successfully deleted"});
  } catch (error) {
    res.status(500).send({ error });
  }
}