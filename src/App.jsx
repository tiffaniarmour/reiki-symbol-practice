import { useState } from "react";

import choKuRei from "./assets/cho-ku-rei.png";
import seiHeKi from "./assets/sei-he-ki.png";
import honShaZeShoNen from "./assets/hon-sha-ze-sho-nen.png";
import daiKoMyo from "./assets/dai-ko-myo.png";

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(null);

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
    },
    {
      name: "Dai Ko Myo",
      meaning: "Master Symbol",
      image: daiKoMyo,
    },
  ];

  if (selectedSymbol) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f4efe6",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <button
          onClick={() => setSelectedSymbol(null)}
          style={{
            marginBottom: "2rem",
            padding: "0.75rem 1rem",
            borderRadius: "12px",
            border: "none",
            backgroundColor: "#3f6f9f",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back
        </button>

        <h1
          style={{
            fontSize: "4rem",
            marginBottom: "0.5rem",
            color: "#111",
          }}
        >
          {selectedSymbol.name}
        </h1>

        <p
          style={{
            fontSize: "1.75rem",
            marginBottom: "2rem",
            color: "#333",
          }}
        >
          {selectedSymbol.meaning}
        </p>

        <div
          style={{
            backgroundColor: "white",
            padding: "1rem",
            borderRadius: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={selectedSymbol.image}
            alt={selectedSymbol.name}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "contain",
            }}
          />
        </div>

        <button
          style={{
            marginTop: "2rem",
            padding: "1rem 1.5rem",
            borderRadius: "14px",
            border: "none",
            backgroundColor: "#d72563",
            color: "white",
            fontSize: "1rem",
            cursor: "pointer",
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
        padding: "2rem",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "3rem",
          marginBottom: "1rem",
        }}
      >
        Reiki Symbol Practice
      </h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "3rem",
          fontSize: "1.2rem",
          color: "#444",
        }}
      >
        Welcome to your Reiki practice space
      </p>

      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        {symbols.map((symbol) => (
          <div
            key={symbol.name}
            style={{
              backgroundColor: "white",
              padding: "1.5rem",
              borderRadius: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h2>{symbol.name}</h2>

            <p>{symbol.meaning}</p>

            <button
              onClick={() => setSelectedSymbol(symbol)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "12px",
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
    </div>
  );
}

export default App;