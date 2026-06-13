# redirect-tracker

Página intermedia para registrar clics de campañas WhatsApp en **Jelou Datum**, antes de redirigir al usuario a Etapa.

---

## Cómo funciona

1. Jelou envía la plantilla con URL dinámica: `tudominio.vercel.app/api/r?id={{1}}`
2. El `{{1}}` es el `id` del registro en Datum (ej: `9eps12ho1yf84n6`)
3. El usuario toca el botón → pasa por tu página en ~0.5s
4. El script actualiza el campo `plan` de ese registro con la fecha y hora del clic
5. El usuario llega a Etapa sin notar nada

---

## Variables de entorno en Vercel

| Variable           | Valor                                        |
|--------------------|----------------------------------------------|
| JELOU_BASE_URL     | https://demo-etapa-w17sqo.jelou.cloud        |
| JELOU_COLLECTION   | pbc_1195740065                               |
| JELOU_API_KEY      | tu X-Api-Key de Datum                        |
| REDIRECT_URL       | https://www.etapa.net.ec/appmietapa/planIdeal|

---

## URL que va en Jelou (plantilla dinámica)

```
https://tu-proyecto.vercel.app/api/r?id={{1}}
```

El `{{1}}` lo mapeas al campo `id` del registro en Datum al momento del envío.

---

## Resultado en Datum

| id               | name  | contacto        | plan                |
|------------------|-------|-----------------|---------------------|
| 9eps12ho1yf84n6  | Jime  | 593.958.767.341 | —                   |
| opxy192xb4uj6dz  | Sofia | 593.999.003.121 | 2026-06-12 15:30:45 ✅|

---

## Despliegue en Vercel

```bash
git init
git add .
git commit -m "redirect tracker"
git push
```

Luego en vercel.com → Add New Project → importa el repo → agrega las variables de entorno → Deploy.

---

## Obtener tu X-Api-Key de Datum

1. Jelou → Datum → tu base `nuevos_planes`
2. Clic en "Vista previa de API" (esquina superior derecha)
3. Ahí aparece el header `X-Api-Key: YOUR_API_KEY`
4. Copia ese valor
