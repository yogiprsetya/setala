export const GET = async (request: Request) => {
  const data = request;
  return Response.json({ data });
};
