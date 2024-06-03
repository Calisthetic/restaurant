import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function PostUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {name, email, login, password, gender, role_id} = req.body
    if (name.split(' ').length < 2 && name.split(' ').length > 3) {
      return res.status(400).send({message: "Wrong name"})
    }
    const first_name = name.split(' ')[0]
    const second_name = name.split(' ')[1]
    const third_name = name.split(' ').length === 3 ? name.split(' ')[2] : null
    const result = await sql`INSERT INTO users 
    (first_name, second_name, third_name, email, login, password, gender, role_id) VALUES
    (${first_name}, ${second_name}, ${third_name}, ${email}, ${login}, ${password}, ${gender}, ${role_id});`;
    
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}