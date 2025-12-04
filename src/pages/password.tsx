import React, { useState } from "react";
import { IonPage, IonButton } from "@ionic/react";
import api from "../api/axios";

const Password: React.FC = () => {
  const [password, setPassword] = useState("");

  async function savePassword() {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No autorizado");
      return;
    }

    // Añadimos el token a las peticiones
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    try {
      await api.post("/auth/set-password", { password });

      alert("Contraseña creada con éxito");

      // 👇 AHORA: PRIMERO CREO CONTRASEÑA, LUEGO SELECCIONO ROL
      window.location.href = "/selectrole";
    } catch (err) {
      console.error(err);
      alert("Error al guardar la contraseña");
    }
  }

  const css = `
    .pw-background {
      min-height: 100vh;
      width: 100%;
      background: #eef5ff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 24px 16px;
      box-sizing: border-box;
    }

    .pw-card {
      width: 100%;
      max-width: 420px;
      background: #ffffff;
      padding: 28px 22px;
      border-radius: 22px;
      box-shadow: 0px 12px 26px rgba(0,0,0,0.08);
      text-align: center;
    }

    .pw-title {
      font-size: 22px;
      font-weight: 700;
      color: #155ac5;
      margin-bottom: 6px;
    }

    .pw-sub {
      font-size: 14px;
      color: #6c7a92;
      margin-bottom: 20px;
    }

    .pw-input {
      width: 100%;
      padding: 14px;
      border-radius: 14px;
      border: 1px solid #d9e3f5;
      margin-bottom: 22px;
      font-size: 15px;
      background: #f7faff;
      outline: none;
      color: #1a1a1a;
      box-sizing: border-box;
    }

    .pw-input::placeholder {
      color: #9aa5bd;
    }

    .pw-btn {
      --background: #1e71d8;
      height: 48px;
      border-radius: 12px;
      font-size: 16px;
    }

    @media (min-width: 768px) {
      .pw-background {
        padding: 32px;
      }
    }

    @media (min-width: 1024px) {
      .pw-card {
        padding: 32px 28px;
      }
    }
  `;

  return (
    <IonPage>
      <style>{css}</style>

      <div className="pw-background">
        <div className="pw-card">
          <h2 className="pw-title">Crear contraseña</h2>
          <p className="pw-sub">Ingresa tu nueva clave</p>

          <input
            type="password"
            className="pw-input"
            placeholder="Escribe tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <IonButton expand="block" className="pw-btn" onClick={savePassword}>
            Guardar contraseña
          </IonButton>
        </div>
      </div>
    </IonPage>
  );
};

export default Password;
