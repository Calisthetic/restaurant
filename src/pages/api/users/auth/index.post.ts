import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostUserAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { login, password } = req.body
    const result =
      await sql`SELECT users.id, users.email, users.first_name, users.second_name, users.third_name, 
      users.gender, users.role_id, roles.name AS role_name
      FROM users INNER JOIN roles ON users.role_id=roles.id WHERE (email = ${login} AND password = ${password}) 
      OR (login = ${login} AND password = ${password});`;
    if ({ result }.result.rows.length === 0) {res.status(404).send({result: "User not found"})}
    
    res.status(200).send({ result }.result.rows[0]);
  } catch (error) {
    res.status(500).send({ error });
  }
}