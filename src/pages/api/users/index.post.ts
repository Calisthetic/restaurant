import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {first_name, second_name, third_name, email, login, password, gender, role_id} = req.body
    
    const result = await sql`INSERT INTO users 
    (first_name, second_name, third_name, email, login, password, gender, role_id) VALUES
    (${first_name}, ${second_name}, ${third_name}, ${email}, ${login}, ${password}, ${gender}, ${role_id});`;
    
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}