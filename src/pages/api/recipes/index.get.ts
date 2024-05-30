import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetRecipes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sqlresult =
      await sql`SELECT * FROM dishes`;
    const obj:any = {sqlresult}
    const result:any = obj.sqlresult.rows
    for (let i = 0; i < result.length; i++) {
      const ingrsreq = sql`SELECT * FROM ingredients WHERE dish_id = ${result[i].id}`
      const recipesreq = sql`SELECT * FROM recipes WHERE dish_id = ${result[i].id}`
      const ingrres = await ingrsreq
      const reciperes = await recipesreq
      const ingrobj:any = {ingrres}
      const recipesobj:any = {reciperes}
      result[i].ingredients = ingrobj.ingrres.rows
      result[i].recipes = recipesobj.reciperes.rows
    }
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ error });
  }
}