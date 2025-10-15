import React from "react";
import { IonContent } from "@ionic/react";
import "./PatientPage.css";

const PatientHistory: React.FC = () => {
  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1"></div>
      <div className="patient-bubble b2"></div>

      <div className="patient-container">
        <h1 className="patient-title">Historial 🕓</h1>
        <p className="patient-subtitle">Registro de tus medicaciones</p>

        <div className="patient-card">
          <h3>Hoy</h3>
          <p>✅ Amoxicilina — 10:00 AM</p>
          <p>✅ Ibuprofeno — 14:00 PM</p>
          <p>⚠️ Omeprazol — Omitida</p>
        </div>

        <div className="patient-card">
          <h3>Ayer</h3>
          <p>✅ Todas las dosis completadas</p>
        </div>
      </div>
    </IonContent>
  );
};

export default PatientHistory;
