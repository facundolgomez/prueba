import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());

const openai = process.env.OPENAI_API_KEY ? new OpenAI() : null;

app.post("/api/ia", async (req, res) => {
  const { texto } = req.body;
  if (!openai)
    return res.json({ respuesta: `Recibí: "${texto}" (modo prueba, sin key)` });
  try {
    const r = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: texto }],
    });
    res.json({ respuesta: r.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Servir el frontend
const dist = path.join(__dirname, "client/dist");
app.use(express.static(dist));
app.use((req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(3000, () => console.log("Corriendo en http://localhost:3000"));
