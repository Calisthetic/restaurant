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
      await sql`SELECT users.id, users.first_name, users.second_name, 
      users.third_name, users.email, users.login, users.password, users.gender, roles.name AS role_name FROM users
      LEFT JOIN roles ON roles.id = users.role_id WHERE users.id=${id}`;
    const obj:any = {sqlresult}
    if (obj.sqlresult.rows.length === 0) {
      return res.status(404).send({message: "User not found"})
    }
    const result:any = obj.sqlresult.rows[0]

    res.status(200).send(result);
  } catch (error) {
    console.log(error)
    res.status(500).send({ error });
  }
}