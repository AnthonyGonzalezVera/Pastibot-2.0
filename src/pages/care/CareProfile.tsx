import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import "./CarePage.css";

const CareProfile: React.FC = () => {
  const [dark, setDark] = useState<boolean>(document.body.dataset.theme === "dark");

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    if (next) document.body.dataset.theme = "dark";
    else delete document.body.dataset.theme;
  };

  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b3" />

      <div className="care-container">
        <h1 className="care-title">
          Mi perfil <span role="img" aria-label="user">👤</span>
        </h1>
        <p className="care-subtitle">Configuración de tu cuenta</p>

        <div className="care-card">
          <h3>Anthony González</h3>
          <p>Cuidador • anthony@pastibot.com</p>
        </div>

        <div className="care-card">
          <h3>Preferencias</h3>
          <button className="care-btn" onClick={toggleTheme}>
            {dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          </button>
        </div>

        <button
          className="care-btn"
          style={{ background: "linear-gradient(135deg, #e53935, #c62828)" }}
          onClick={() => alert("Cerrar sesión (simulado)")}
        >
          Cerrar sesión
        </button>
      </div>
    </IonContent>
  );
};

export default CareProfile;
