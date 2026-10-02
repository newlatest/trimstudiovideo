export default async (req) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
    headers: { "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}` },
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/replicate/status" };
