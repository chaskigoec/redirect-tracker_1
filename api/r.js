// api/r.js — Vercel Serverless Function
// Recibe: ?tel=593958767341
// Crea un registro nuevo en Jelou Datum y redirige a Etapa

const JELOU_BASE_URL    = process.env.JELOU_BASE_URL;
const JELOU_COLLECTION  = process.env.JELOU_COLLECTION;
const JELOU_API_KEY     = process.env.JELOU_API_KEY;
const REDIRECT_URL      = process.env.REDIRECT_URL || "https://www.etapa.net.ec/appmietapa/planIdeal";

export default async function handler(req, res) {
  const tel = req.query.tel || "";

  if (tel && JELOU_BASE_URL && JELOU_COLLECTION && JELOU_API_KEY) {
    try {
      const fechaClick = new Date().toISOString().replace("T", " ").substring(0, 19);

      await fetch(`${JELOU_BASE_URL}/api/collections/${JELOU_COLLECTION}/records`, {
        method: "POST",
        headers: {
          "X-Api-Key": JELOU_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contacto: tel,
          respuesta: fechaClick
        })
      });
    } catch (err) {
      console.error("Jelou Datum error:", err.message);
    }
  }

  res.redirect(302, REDIRECT_URL);
}