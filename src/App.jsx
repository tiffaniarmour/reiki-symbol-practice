import { useRef, useState } from "react";

import choKuRei from "./assets/cho-ku-rei.png";
import seiHeKi from "./assets/sei-he-ki.png";
import honShaZeShoNen from "./assets/hon-sha-ze-sho-nen.png";
import daiKoMyo from "./assets/dai-ko-myo.png";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const symbols = [
    { name: "Cho Ku Rei", meaning: "Power Symbol", image: choKuRei },
    { name: "Sei He Ki", meaning: "Mental / Emotional Healing", image: seiHeKi },
    { name: "Hon Sha Ze Sho Nen", meaning: "Distance Symbol", image: honShaZeShoNen },
    { name: "Dai Ko Myo", meaning: "Master Symbol", image: daiKoMyo },
  ];

  function getPosition(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches?.[0];

    return {
      x: (touch ? touch.clientX : event.clientX) - rect.left,
      y: (touch ? touch.clientY : event.clientY) - rect.top,
    };
  }

  function startDrawing(event) {
    event.preventDefault();
    isDrawing.current = true;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPosition(event);

    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function draw(event) {
    if (!isDrawing.current) return;
    event.preventDefault();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPosition(event);

    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#3f6f9f";
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing() {
    isDrawing.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  if (selectedSymbol) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f4efe6", padding: "2rem", fontFamily: "sans-serif", color: "#2d2d2d", textAlign: "center" }}>
        <button onClick={() => setSelectedSymbol(null)} style={{ padding: "0.75rem 1rem", border: "none", borderRadius: "10px", backgroundColor: "#3f6f9f", color: "white", cursor: "pointer", marginBottom: "2rem" }}>
          ← Back
        </button>

        <h1>{selectedSymbol.name}</h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>{selectedSymbol.meaning}</p>

        <div style={{ position: "relative", width: "320px", height: "320px", margin: "0 auto", backgroundColor: "white", borderRadius: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", overflow: "hidden" }}>
          <img src={selectedSymbol.image} alt={selectedSymbol.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", opacity: 0.25, padding: "1rem" }} />

          <canvas
            ref={canvasRef}
            width="320"
            height="320"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", touchAction: "none", cursor: "crosshair" }}
          />
        </div>

        <button onClick={clearCanvas} style={{ marginTop: "1rem", padding: "0.75rem 1rem", borderRadius: "10px", border: "none", backgroundColor: "#d72563", color: "white", cursor: "pointer" }}>
          Clear Practice
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f4efe6", color: "#2d2d2d", padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Reiki Symbol Practice</h1>
      <p style={{ textAlign: "center" }}>Welcome to your Reiki practice space.</p>

      <div style={{ display: "grid", gap: "1rem", maxWidth: "500px", margin: "2rem auto" }}>
        {symbols.map((symbol) => (
          <div key={symbol.name} style={{ backgroundColor: "white", padding: "1rem", borderRadius: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <h2>{symbol.name}</h2>
            <p>{symbol.meaning}</p>
            <button onClick={() => setSelectedSymbol(symbol)} style={{ padding: "0.75rem", borderRadius: "10px", border: "none", backgroundColor: "#3f6f9f", color: "white", cursor: "pointer" }}>
              Practice Symbol
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;