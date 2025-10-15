import React from "react";
import { IonContent } from "@ionic/react";
import "./CarePage.css";

const CareControl: React.FC = () => {
  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />

      <div className="care-container">
        <h1 className="care-title">
          Control del robot <span role="img" aria-label="robot">🤖</span>
        </h1>
        <p className="care-subtitle">Prueba servos, luces y ojos</p>

        <button className="care-btn" onClick={() => alert("Dispensar manualmente (simulado)")}>
          Dispensar ahora
        </button>

        <div className="care-card">
          <h3>Estado general</h3>
          <p>WiFi: Conectado 📶</p>
          <p>Batería: 92% 🔋</p>
        </div>

        <div className="care-card">
          <h3>Pruebas rápidas</h3>
          <div className="row">
            <button className="care-btn" onClick={() => alert("Mover servos (simulado)")}>
              Probar servos
            </button>
            <button className="care-btn" onClick={() => alert("Luces encendidas (simulado)")}>
              Luces LED
            </button>
          </div>
        </div>

        <div className="care-card">
          <h3>Personalización</h3>
          <p>Elige ojos/ánimo y color LED</p>
          <div className="emotions">
            <div className="emotion-card" onClick={() => alert("Animación: feliz 😊")}>
              <span className="emoji">😊</span>
              Feliz
            </div>
            <div className="emotion-card" onClick={() => alert("Animación: triste 😢")}>
              <span className="emoji">😢</span>
              Triste
            </div>
            <div className="emotion-card" onClick={() => alert("Animación: enojado 😡")}>
              <span className="emoji">😡</span>
              Enojado
            </div>
          </div>
          <button className="care-btn" onClick={() => alert("Selector de color (simulado)")}>
            Elegir color LED
          </button>
        </div>
      </div>
    </IonContent>
  );
};

export default CareControl;
