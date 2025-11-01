import React from "react";
import { IonContent } from "@ionic/react";
import "./PatientPage.css";

const PatientHome: React.FC = () => {
  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1"></div>
      <div className="patient-bubble b2"></div>
      <div className="patient-bubble b3"></div>

      <div className="patient-container">
        <h1 className="patient-title">Hola, Anthony 👋</h1>
        <p className="patient-subtitle">Tu resumen de hoy</p>

        <div className="patient-card">
          <h3>Próxima toma</h3>
          <p>Amoxicilina — 14:00 PM</p>
        </div>

        <div className="patient-card">
          <h3>Progreso diario</h3>
          <p>3 de 5 dosis completadas ✅</p>
        </div>

        <button className="patient-btn">Tomar ahora</button>
      </div>
    </IonContent>
  );
};

export default PatientHome;
