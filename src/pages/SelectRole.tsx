import React, { useState } from "react";
import { IonPage, IonContent, IonModal } from "@ionic/react";
import { FaUserNurse } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import "./SelectRole.css";

const SelectRole: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"care" | "patient" | null>(null);

  const handleSelect = (role: "care" | "patient") => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const confirmRole = () => {
    if (selectedRole === "care") {
      history.push("/care/home");
    } else if (selectedRole === "patient") {
      history.push("/patient/home");
    }
    setShowModal(false);
  };

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
            <div className="role-card cuidador" onClick={() => handleSelect("care")}>
              <FaUserNurse className="role-icon" />
              <h2>Cuidador</h2>
              <p>Control total del robot</p>
            </div>

            <div className="role-card paciente" onClick={() => handleSelect("patient")}>
              <FaUser className="role-icon" />
              <h2>Paciente</h2>
              <p>Recibe tus recordatorios</p>
            </div>
          </div>
        </div>

        {/* 🎨 Modal bonito de confirmación */}
        <IonModal isOpen={showModal} className="confirm-modal" onDidDismiss={() => setShowModal(false)}>
          <div className="modal-content">
            <h2>¿Confirmar rol?</h2>
            <p>
              {selectedRole === "care"
                ? "¿Deseas continuar como Cuidador?"
                : "¿Deseas continuar como Paciente?"}
            </p>

            <div className="modal-buttons">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>
                Atrás
              </button>
              <button className="btn-confirm" onClick={confirmRole}>
                Sí, continuar
              </button>
            </div>
          </div>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default SelectRole;
