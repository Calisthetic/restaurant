import { sql } from '@vercel/postgres';
import { NextApiRequest, NextApiResponse } from "next"

export default async function DeleteUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query
    if (typeof id !== "string") {
      return res.status(400).send({message: 'Bad request'})
    }

    const result = await sql`DELETE FROM users WHERE id=${id};`;
    
    res.status(200).send({ result });
  } catch (error) {
    res.status(500).send({ error });
  }
}