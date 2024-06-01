import groupBy from '@/utils/groupBy';
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetRecipe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    if (typeof id !== "string") {
      return res.status(400).send({message: 'Bad request'})
    }
    const sqlresult =
      await sql`SELECT dishes.id, dishes.name, dishes.portions, dishes.cook_time, dishes.price, 
      users.first_name as user_first_name, users.second_name as user_second_name, dish_categories.dish_category_name
      FROM dishes LEFT JOIN dish_categories ON dishes.category_id=dish_categories.id
      LEFT JOIN users ON dishes.user_id=users.id WHERE dishes.id=${id}`;
    const obj:any = {sqlresult}
    if (obj.sqlresult.rows.length === 0) {
      return res.status(404).send({message: "Dish not found"})
    }
    const result:any = obj.sqlresult.rows[0]

    result.ingredients = sql`SELECT id, ingredient, count FROM ingredients WHERE dish_id = ${result.id}`
    result.recipes = sql`SELECT id, text FROM recipes WHERE dish_id = ${result.id}`
    
    const ingrres = await result.ingredients
    const reciperes = await result.recipes
    result.ingredients = {ingrres}.ingrres.rows
    result.recipes = {reciperes}.reciperes.rows

    res.status(200).send(result);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error });
  }
}