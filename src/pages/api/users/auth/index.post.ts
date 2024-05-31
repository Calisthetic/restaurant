import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostUserAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { login, password } = req.body
    const result =
      await sql`SELECT * FROM users INNER JOIN roles ON users.role_id=roles.id WHERE (email = ${login} AND password = ${password}) 
      OR (login = ${login} AND password = ${password});`;
    if ({ result }.result.rows.length === 0) {res.status(404).send({result: "User not found"})}
    const user = {
      id:{ result }.result.rows[0].id,
      role_id:{ result }.result.rows[0].role_id,
      role_name:{ result }.result.rows[0].name,
      email:{ result }.result.rows[0].email,
      first_name:{ result }.result.rows[0].first_name,
      second_name:{ result }.result.rows[0].second_name,
      third_name:{ result }.result.rows[0].third_name,
      gender:{ result }.result.rows[0].gender,
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error });
  }
}