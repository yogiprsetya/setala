import { NextApiRequest } from 'next';

export const bodyParse = async (req: NextApiRequest) => {
  const body = await new Response(req.body).json();
  return body;
};
