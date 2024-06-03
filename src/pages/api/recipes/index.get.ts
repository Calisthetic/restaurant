import groupBy from '@/utils/groupBy';
import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetRecipes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const sqlresult =
      await sql`SELECT 
      dishes.id,
      dishes.name,
      dishes.portions,
      dishes.cook_time,
      dishes.price,
      users.first_name AS user_first_name,
      users.second_name AS user_second_name,
      dish_categories.dish_category_name,
      COUNT(DISTINCT ingredients.id) AS ingredients_count,
      COUNT(DISTINCT recipes.id) AS recipes_count
      FROM dishes 
      LEFT JOIN dish_categories ON dishes.category_id = dish_categories.id 
      LEFT JOIN users ON dishes.user_id = users.id 
      LEFT JOIN ingredients ON ingredients.dish_id = dishes.id 
      LEFT JOIN recipes ON recipes.dish_id = dishes.id
      WHERE dishes.portions IS NOT NULL AND dishes.cook_time IS NOT NULL
      GROUP BY 
      dishes.id, dishes.name, dishes.portions, dishes.cook_time, dishes.price,
      users.first_name, users.second_name, dish_categories.dish_category_name
      HAVING COUNT(ingredients.id) > 0 AND COUNT(recipes.id) > 0;`;
    const obj:any = {sqlresult}
    const result:any = obj.sqlresult.rows

    const result1 = groupBy(result, "dish_category_name")
    //console.log(result)
    res.status(200).send(result1);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error });
  }
}