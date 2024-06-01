import { NextApiRequest, NextApiResponse } from "next"
import GetRecipe from './index.get';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      GetRecipe(req, res)
      break;
    default:
      // Invalid method
      res.status(405).send({ message: 'Invalid method' });
      break;
  }
}