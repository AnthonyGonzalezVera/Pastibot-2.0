import React from "react";
import { IonContent } from "@ionic/react";
import "./PatientPage.css";

const PatientProfile: React.FC = () => {
  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1"></div>
      <div className="patient-bubble b2"></div>

      <div className="patient-container">
        <h1 className="patient-title">Mi perfil 👤</h1>
        <p className="patient-subtitle">Configuración y datos personales</p>

        <div className="patient-card">
          <h3>Anthony González</h3>
          <p>Edad: 24 años</p>
          <p>Condición: Hipertensión leve</p>
        </div>

        <div className="patient-card">
          <h3>Mi cuidador</h3>
          <p>👨‍⚕️ Cuidador: Carlos Vega</p>
          <button className="patient-btn">Contactar por WhatsApp</button>
        </div>

        <div className="patient-card">
          <h3>Preferencias</h3>
          <p>🔔 Notificaciones activadas</p>
          <p>🌙 Modo oscuro: Automático</p>
        </div>
      </div>
    </IonContent>
  );
};

export default PatientProfile;
