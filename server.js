const http = require("http");
const SRC = "https://ltbyatmaovlbcldgdtij.supabase.co/storage/v1/object/public/mockups/onboarding-mockups.html";
const PORT = process.env.PORT || 3000;

http.createServer(async (req, res) => {
  if (req.url && req.url.startsWith("/health")) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
    return;
  }
  try {
    const r = await fetch(SRC, { cache: "no-store" });
    if (!r.ok) throw new Error("upstream " + r.status);
    const html = await r.text();
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    res.end(html);
  } catch (e) {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Error loading mockup: " + (e && e.message ? e.message : String(e)));
  }
}).listen(PORT, () => console.log("mockup host up on " + PORT));
