import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostUserAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { login, password } = req.body
    const result =
      await sql`SELECT * FROM users WHERE (email = ${login} AND password = ${password}) 
      OR (login = ${login} AND password = ${password});`;
    res.status(200).send({ result }.result.rows);
  } catch (error) {
    res.status(500).send({ error });
  }
}