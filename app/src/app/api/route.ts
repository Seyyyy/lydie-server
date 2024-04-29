export async function GET(request: Request) {
  console.log(request.url);
  return new Response("Hello, world!", {
    headers: { "content-type": "text/plain" },
  });
}
