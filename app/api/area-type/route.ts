export const GET = async (request: Request) => {
  const data = request.headers;
  return Response.json({ data });
};
