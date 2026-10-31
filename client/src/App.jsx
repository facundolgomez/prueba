import { useState } from "react";

export default function App() {
  const [texto, setTexto] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  async function preguntar() {
    setCargando(true);
    const res = await fetch("/api/ia", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texto }),
    });
    const data = await res.json();
    setRespuesta(data.respuesta || data.error);
    setCargando(false);
  }

  return (
    <div
      style={{ maxWidth: 500, margin: "50px auto", fontFamily: "sans-serif" }}
    >
      <h1>App de prueba IA</h1>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{ width: "100%", padding: 8 }}
      />
      <button onClick={preguntar} disabled={cargando} style={{ marginTop: 10 }}>
        {cargando ? "Pensando..." : "Preguntar"}
      </button>
      <p>{respuesta}</p>
    </div>
  );
}
