// api/r.js — Vercel Serverless Function
// Recibe: ?id=9eps12ho1yf84n6
// Actualiza campo "plan" en Jelou Datum y redirige a Etapa

const JELOU_BASE_URL    = process.env.JELOU_BASE_URL;    // https://demo-etapa-w17sqo.jelou.cloud
const JELOU_COLLECTION  = process.env.JELOU_COLLECTION;  // pbc_1195740065
const JELOU_API_KEY     = process.env.JELOU_API_KEY;     // X-Api-Key
const REDIRECT_URL      = process.env.REDIRECT_URL || "https://www.etapa.net.ec/appmietapa/planIdeal";

export default async function handler(req, res) {
  const recordId = req.query.id || "";

  if (recordId && JELOU_BASE_URL && JELOU_COLLECTION && JELOU_API_KEY) {
    try {
      const fechaClick = new Date().toISOString().replace("T", " ").substring(0, 19);

      await fetch(`${JELOU_BASE_URL}/api/collections/${JELOU_COLLECTION}/records/${recordId}`, {
        method: "PATCH",
        headers: {
          "X-Api-Key": JELOU_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          respuesta: fechaClick   // ej: "2026-06-12 15:30:45"
        })
      });
    } catch (err) {
      console.error("Jelou Datum error:", err.message);
    }
  }

  // Redirigir siempre, aunque falle el registro
  res.redirect(302, REDIRECT_URL);
}
