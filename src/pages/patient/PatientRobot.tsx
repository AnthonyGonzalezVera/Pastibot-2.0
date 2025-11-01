import React from "react";
import { IonContent } from "@ionic/react";
import "./PatientPage.css";

const PatientRobot: React.FC = () => {
  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1"></div>
      <div className="patient-bubble b2"></div>

      <div className="patient-container">
        <h1 className="patient-title">Mi robot</h1>
        <p className="patient-subtitle">Controla tu dispensador</p>

        <div className="patient-card">
          <h3>Estado</h3>
          <p>WiFi: Conectado 📶</p>
          <p>Listo para dispensar 💊</p>
        </div>

        <button className="patient-btn">Dispensar ahora</button>

        <div className="patient-card">
          <h3>Última acción</h3>
          <p>Tomada correctamente — Hoy 10:00 AM ✅</p>
        </div>
      </div>
    </IonContent>
  );
};

export default PatientRobot;
