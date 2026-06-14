// api/r.js — Vercel Serverless Function
// Recibe: ?tel=593958767341&nombre=Jime&campana=etapa_280520261539

const JELOU_BASE_URL   = process.env.JELOU_BASE_URL;
const JELOU_COLLECTION = process.env.JELOU_COLLECTION;
const JELOU_API_KEY    = process.env.JELOU_API_KEY;
const REDIRECT_URL     = process.env.REDIRECT_URL || "https://www.etapa.net.ec/appmietapa/planIdeal";

// Cache en memoria para evitar doble registro en misma ejecución
const recentRequests = new Set();

export default async function handler(req, res) {
  const tel     = req.query.tel     || "";
  const nombre  = req.query.nombre  || "";
  const campana = req.query.campana || "";

  // Solo procesar GET con teléfono válido
  if (req.method !== "GET" || !tel) {
    return res.redirect(302, REDIRECT_URL);
  }

  // Evitar duplicados: ignorar mismo tel en menos de 2 segundos
  const key = `${tel}_${Math.floor(Date.now() / 2000)}`;
  if (recentRequests.has(key)) {
    return res.redirect(302, REDIRECT_URL);
  }
  recentRequests.add(key);
  setTimeout(() => recentRequests.delete(key), 2000);

  if (JELOU_BASE_URL && JELOU_COLLECTION && JELOU_API_KEY) {
    try {
      const fechaClick = new Date().toISOString().replace("T", " ").substring(0, 19);

      await fetch(`${JELOU_BASE_URL}/api/collections/${JELOU_COLLECTION}/records`, {
        method: "POST",
        headers: {
          "X-Api-Key": JELOU_API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contacto:      tel,
          name:          nombre,
          campaign_name: campana,
          respuesta:     "Clic Formulario",
          responded:     fechaClick
        })
      });
    } catch (err) {
      console.error("Jelou Datum error:", err.message);
    }
  }

  res.redirect(302, REDIRECT_URL);
}