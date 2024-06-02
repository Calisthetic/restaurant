import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function GetUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await sql`SELECT users.id, users.first_name, users.second_name, 
    users.third_name, users.email, users.login, users.password, users.gender, roles.name AS role_name FROM users
    LEFT JOIN roles ON roles.id = users.role_id;`;
    
    res.status(200).send({ result }.result.rows);
  } catch (error) {
    res.status(500).send({ error });
  }
}