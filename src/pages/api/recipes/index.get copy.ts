import groupBy from '@/utils/groupBy';
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetRecipes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sqlresult =
      await sql`SELECT dishes.id, dishes.name, dishes.portions, dishes.cook_time, dishes.price, 
      users.first_name, users.second_name, dish_categories.dish_category_name
      FROM dishes LEFT JOIN dish_categories ON dishes.category_id=dish_categories.id
      LEFT JOIN users ON dishes.user_id=users.id`;
    const obj:any = {sqlresult}
    const result:any = obj.sqlresult.rows

    for (let i = 0; i < result.length; i++) {
      result[i].ingredients = sql`SELECT id, ingredient, count FROM ingredients WHERE dish_id = ${result[i].id}`
      result[i].recipes = sql`SELECT id, text FROM recipes WHERE dish_id = ${result[i].id}`
    }
    for (let i = 0; i < result.length; i++) {
      const ingrres = await result[i].ingredients
      const reciperes = await result[i].recipes
      result[i].ingredients = {ingrres}.ingrres.rows
      result[i].recipes = {reciperes}.reciperes.rows
    }
    const result1 = groupBy(result, "dish_category_name")
    //console.log(result)
    res.status(200).send(result1);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error });
  }
}