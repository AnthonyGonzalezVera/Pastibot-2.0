import React from "react";
import { IonContent } from "@ionic/react";
import "./CarePage.css";

const CareHome: React.FC = () => {
  return (
    <IonContent fullscreen className="care-page">
      {/* Burbujaaass */}
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />
      <div className="care-bubble b3" />

      <div className="care-container">
        <h1 className="care-title">Hola, Anthony 👋</h1>
        <p className="care-subtitle">Resumen del sistema</p>

        <div className="care-card">
          <h3>Próxima toma</h3>
          <p>Paracetamol — Hoy 20:00</p>
        </div>

        <div className="care-card">
          <h3>Alertas</h3>
          <p>✅ Todo en orden</p>
        </div>

        <button
          className="care-btn"
          onClick={() => alert("Historial de dispensaciones (próximamente)")}
        >
          Ver historial
        </button>
      </div>
    </IonContent>
  );
};

export default CareHome;
