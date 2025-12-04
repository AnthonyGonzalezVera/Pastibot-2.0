import React, { useState } from "react";
import { IonPage, IonContent, IonModal } from "@ionic/react";
import { FaUserNurse } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { useHistory } from "react-router-dom";
import api from "../api/axios"; // 👈 Asegúrate de tener esto
import "./SelectRole.css";

const SelectRole: React.FC = () => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"care" | "patient" | null>(null);

  const handleSelect = (role: "care" | "patient") => {
    setSelectedRole(role);
    setShowModal(true);
  };

  // ============================================================
  // 🚀 GUARDAR EL ROL EN EL BACKEND
  // ============================================================
  const confirmRole = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No autorizado");
      return;
    }

    const backendRole =
      selectedRole === "care" ? "CUIDADOR" : "PACIENTE";

    try {
      // Guardar el rol en la BD
      await api.post(
        "/auth/set-role",
        { role: backendRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Luego navegar
      if (selectedRole === "care") {
        history.push("/care/home");
      } else {
        history.push("/patient/home");
      }

    } catch (err) {
      console.error(err);
      alert("Error al guardar el rol");
    }

    setShowModal(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="selectrole-page">
        <div className="top-gradient"></div>
        <div className="bottom-gradient"></div>

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
