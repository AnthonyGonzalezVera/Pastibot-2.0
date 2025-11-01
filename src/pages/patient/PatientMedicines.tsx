import React from "react";
import { IonContent } from "@ionic/react";
import "./PatientPage.css";

const PatientMedicines: React.FC = () => {
  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1"></div>
      <div className="patient-bubble b2"></div>

      <div className="patient-container">
        <h1 className="patient-title">Mis medicinas</h1>
        <p className="patient-subtitle">Asignadas por tu cuidador</p>

        <div className="patient-card">
          <h3>Ibuprofeno</h3>
          <p>1 tableta cada 8h</p>
        </div>

        <div className="patient-card">
          <h3>Amoxicilina</h3>
          <p>2 cápsulas diarias — 5 días restantes</p>
        </div>

        <div className="patient-card">
          <h3>Omeprazol</h3>
          <p>Antes del desayuno — Diario</p>
        </div>
      </div>
    </IonContent>
  );
};

export default PatientMedicines;
