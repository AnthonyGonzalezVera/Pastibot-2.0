import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { FaUserNurse } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import "./SelectRole.css";

const SelectRole: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="selectrole-page">
        {/* Fondo decorativo */}
        <div className="top-gradient"></div>
        <div className="bottom-gradient"></div>

        {/* Contenido principal */}
        <div className="role-container">
          <h1 className="title">Elige tu Rol</h1>
          <p className="subtitle">Selecciona cómo quieres utilizar Pastibot</p>

          <div className="role-buttons">
            {/* 🧑‍⚕️ Cuidador */}
            <div
              className="role-card cuidador"
              onClick={() => (window.location.href = "/care/home")}
            >
              <FaUserNurse className="role-icon" />
              <h2>Cuidador</h2>
              <p>Control total del robot</p>
            </div>

            {/* 🧍 Paciente */}
            <div
              className="role-card paciente"
              onClick={() => (window.location.href = "/patient/home")}
            >
              <FaUser className="role-icon" />
              <h2>Paciente</h2>
              <p>Recibe tus recordatorios</p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SelectRole;
