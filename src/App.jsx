import { useRef, useState } from "react";

import choKuRei from "./assets/cho-ku-rei.png";
import seiHeKi from "./assets/sei-he-ki.png";
import honShaZeShoNen from "./assets/hon-sha-ze-sho-nen.png";
import daiKoMyo from "./assets/dai-ko-myo.png";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [practiceMode, setPracticeMode] = useState(null);

  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const symbols = [
    {
      name: "Cho Ku Rei",
      meaning: "Power Symbol",
      image: choKuRei,
    },
    {
      name: "Sei He Ki",
      meaning: "Mental / Emotional Healing",
      image: seiHeKi,
    },
    {
      name: "Hon Sha Ze Sho Nen",
      meaning: "Distance Symbol",
      image: honShaZeShoNen,
      tall: true,
    },
    {
      name: "Dai Ko Myo",
      meaning: "Master Symbol",
      image: daiKoMyo,
      tall: true,
    },
  ];

  const practiceWidth = 320;
  const practiceHeight = selectedSymbol?.tall ? 460 : 320;

  const penWidth = 4;
  const penColor = "#3f6f9f";

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

    ctx.lineWidth = penWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = penColor;

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing() {
    isDrawing.current = false;
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function goHome() {
    setSelectedSymbol(null);
    setPracticeMode(null);
  }

  function goBackToModeChoice() {
    setPracticeMode(null);
  }

  if (selectedSymbol && !practiceMode) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4efe6",
          padding: "2rem",
          fontFamily: "sans-serif",
          color: "#2d2d2d",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={goHome}
          style={{
            padding: "0.75rem 1rem",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#3f6f9f",
            color: "white",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          ← Back
        </button>

        <h1>{selectedSymbol.name}</h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
          }}
        >
          {selectedSymbol.meaning}
        </p>

        <h2>Choose Practice Mode</h2>

        <div
          style={{
            display: "grid",
            gap: "1rem",
            maxWidth: "420px",
            margin: "2rem auto",
          }}
        >
          <button
            onClick={() => setPracticeMode("freehand")}
            style={{
              padding: "1rem",
              borderRadius: "16px",
              border: "none",
              backgroundColor: "#3f6f9f",
              color: "white",
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
          >
            Freehand Tracing
          </button>

          <div>
            <button
              disabled
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "16px",
                border: "none",
                backgroundColor: "#d72563",
                color: "white",
                cursor: "not-allowed",
                fontSize: "1.1rem",
                opacity: 0.5,
              }}
            >
              Guided Tracing
            </button>

            <p
              style={{
                marginTop: "0.5rem",
                marginBottom: 0,
                fontSize: "0.9rem",
                color: "#6b5f57",
                fontStyle: "italic",
              }}
            >
              Coming Soon
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSymbol && practiceMode === "guided") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4efe6",
          padding: "2rem",
          fontFamily: "sans-serif",
          color: "#2d2d2d",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={goBackToModeChoice}
          style={{
            padding: "0.75rem 1rem",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#3f6f9f",
            color: "white",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          ← Back to Modes
        </button>

        <h1>{selectedSymbol.name}</h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
          }}
        >
          Guided Tracing Mode
        </p>

        <div
          style={{
            width: `${practiceWidth}px`,
            height: `${practiceHeight}px`,
            maxWidth: "90vw",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
            boxSizing: "border-box",
          }}
        >
          <img
            src={selectedSymbol.image}
            alt={selectedSymbol.name}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              opacity: 0.4,
            }}
          />
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "1rem",
            opacity: 0.8,
          }}
        >
          Guided tracing steps will be added here next.
        </p>
      </div>
    );
  }

  if (selectedSymbol && practiceMode === "freehand") {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4efe6",
          padding: "2rem",
          fontFamily: "sans-serif",
          color: "#2d2d2d",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={goBackToModeChoice}
          style={{
            padding: "0.75rem 1rem",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#3f6f9f",
            color: "white",
            cursor: "pointer",
            marginBottom: "2rem",
            fontSize: "1rem",
          }}
        >
          ← Back to Modes
        </button>

        <h1>{selectedSymbol.name}</h1>

        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
          }}
        >
          Freehand Tracing
        </p>

        <div
          style={{
            position: "relative",
            width: `${practiceWidth}px`,
            height: `${practiceHeight}px`,
            maxWidth: "90vw",
            margin: "0 auto",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            overflow: "hidden",
          }}
        >
          <img
            src={selectedSymbol.image}
            alt={selectedSymbol.name}
            style={{
              position: "absolute",
              inset: "10px",
              width: "calc(100% - 20px)",
              height: "calc(100% - 20px)",
              objectFit: "contain",
              opacity: 0.28,
              pointerEvents: "none",
            }}
          />

          <canvas
            ref={canvasRef}
            width={practiceWidth}
            height={practiceHeight}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              touchAction: "none",
              cursor: "crosshair",
            }}
          />
        </div>

        <button
          onClick={clearCanvas}
          style={{
            marginTop: "1rem",
            padding: "0.85rem 1.25rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#d72563",
            color: "white",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Clear Practice
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4efe6",
        color: "#2d2d2d",
        padding: "2rem",
        fontFamily: "sans-serif",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "clamp(2.5rem, 8vw, 4rem)",
          lineHeight: "1",
          marginBottom: "1rem",
        }}
      >
        Reiki Symbol Practice
      </h1>

      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Welcome to your Reiki practice space.
      </p>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          maxWidth: "500px",
          margin: "2rem auto",
        }}
      >
        {symbols.map((symbol) => (
          <div
            key={symbol.name}
            style={{
              backgroundColor: "white",
              padding: "1rem",
              borderRadius: "16px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
            }}
          >
            <h2>{symbol.name}</h2>

            <p>{symbol.meaning}</p>

            <button
              onClick={() => {
                setSelectedSymbol(symbol);
                setPracticeMode(null);
              }}
              style={{
                padding: "0.75rem",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#3f6f9f",
                color: "white",
                cursor: "pointer",
              }}
            >
              Practice Symbol
            </button>
          </div>
        ))}
      </div>

      <footer
        style={{
          textAlign: "center",
          marginTop: "3rem",
          opacity: 0.7,
          fontSize: "0.9rem",
        }}
      >
        Created by Tiffani Armour
      </footer>
    </div>
  );
}

export default App;