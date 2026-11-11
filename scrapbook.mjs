import { getStore } from "@netlify/blobs";

const json = (body, status=200) => new Response(JSON.stringify(body), {status, headers:{"Content-Type":"application/json", "Cache-Control":"no-store"}});
export default async (request) => {
  const store = getStore("scrapbook-content");
  if (request.method === "GET") {
    const saved = await store.get("public-site", { type: "json" });
    return json(saved || { overrides:{}, theme:{}, cards:[], pages:[], photos:[] });
  }
  if (request.method !== "POST") return json({error:"Method not allowed"},405);
  const expected = process.env.SCRAPBOOK_EDIT_PASSWORD;
  if (!expected) return json({error:"Editor password has not been configured in Netlify yet."},503);
  const supplied = (request.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!supplied || supplied !== expected) return json({error:"Unauthorized"},401);
  const raw = await request.text();
  if (raw.length > 4500000) return json({error:"This update is too large. Please use smaller photos."},413);
  let data; try { data = JSON.parse(raw); } catch { return json({error:"Invalid update"},400); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return json({error:"Invalid update"},400);
  await store.setJSON("public-site", data);
  return json({ok:true});
};
