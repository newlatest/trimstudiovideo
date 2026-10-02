export default async (req) => {
  const { video_url, aspect_ratio } = await req.json();

  const res = await fetch("https://api.replicate.com/v1/models/luma/reframe-video/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json",
      "Prefer": "wait",
    },
    body: JSON.stringify({ input: { video_url, aspect_ratio } }),
  });

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/replicate/reframe" };
