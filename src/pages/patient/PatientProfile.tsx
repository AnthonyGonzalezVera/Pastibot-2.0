import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import "./PatientPage.css";

const PatientProfile: React.FC = () => {
  const [photo, setPhoto] = useState("/assets/default-avatar.png");
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempBio, setTempBio] = useState("");
  const [gender, setGender] = useState("Hombre");
  const [showOptions, setShowOptions] = useState(false);

  const handlePhotoChange = () => {
    alert("Cambiar foto (simulado)");
  };

  const handleSave = () => {
    if (tempBio.length > 150) {
      alert("La biografía no puede exceder 150 caracteres.");
      return;
    }
    setBio(tempBio);
    setEditing(false);
  };

  const handleWhatsapp = () => {
    const phone = "593999999999"; // Cambia por número real del cuidador
    window.open(
      `https://wa.me/${phone}?text=Hola, soy tu paciente de Pastibot 👋`,
      "_blank"
    );
  };

  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1" />
      <div className="patient-bubble b3" />

      <div className="patient-container">
        {!editing ? (
          <>
            {/* Foto y datos */}
            <img
              src={photo}
              alt="Foto de perfil"
              className="profile-avatar"
              onClick={handlePhotoChange}
            />

            <h2 className="patient-title">Anthony González</h2>
            <p className="patient-subtitle">Paciente</p>

            {/* Estadísticas */}
            <div style={{ display: "flex", gap: "40px", margin: "12px 0" }}>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ color: "#0288d1" }}>2</h3>
                <p>Medicamentos</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ color: "#0288d1" }}>1</h3>
                <p>Activos</p>
              </div>
            </div>

            {/* Biografía */}
            <div className="profile-bio">
              {bio ? (
                <p>{bio}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#777" }}>
                  Sin biografía todavía.
                </p>
              )}
            </div>

            {/* Botones principales */}
            <button className="patient-btn" onClick={() => setEditing(true)}>
              Editar perfil
            </button>

            <button className="patient-btn whatsapp" onClick={handleWhatsapp}>
              💬 Contactar cuidador
            </button>

            <button
              className="patient-btn"
              style={{
                background: "linear-gradient(135deg, #e53935, #c62828)",
              }}
              onClick={() => alert("Cerrar sesión (simulado)")}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          /* =================== MODO EDICIÓN =================== */
          <div className="edit-profile-card">
            <h2 className="patient-title">Editar perfil</h2>

            {/* Foto */}
            <div className="edit-photo">
              <img
                src={photo}
                alt="Foto de perfil"
                className="profile-avatar"
                onClick={handlePhotoChange}
              />
              <button className="patient-btn small" onClick={handlePhotoChange}>
                Cambiar foto
              </button>
            </div>

            {/* Formulario */}
            <div className="edit-form">
              <label className="input-label">Biografía</label>
              <input
                type="text"
                placeholder="Escribe algo sobre ti..."
                value={tempBio}
                onChange={(e) => setTempBio(e.target.value)}
                maxLength={150}
              />

              <div className="form-group">
                <label className="input-label">Sexo</label>
                <div
                  className="select-wrapper"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <div className="custom-select-display">
                    {gender} <span className="arrow">▾</span>
                  </div>
                  {showOptions && (
                    <div className="custom-options">
                      <div
                        className={`option ${
                          gender === "Hombre" ? "active" : ""
                        }`}
                        onClick={() => {
                          setGender("Hombre");
                          setShowOptions(false);
                        }}
                      >
                        Hombre
                      </div>
                      <div
                        className={`option ${
                          gender === "Mujer" ? "active" : ""
                        }`}
                        onClick={() => {
                          setGender("Mujer");
                          setShowOptions(false);
                        }}
                      >
                        Mujer
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Botones finales */}
            <div className="edit-actions">
              <button
                className="patient-btn outline"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
              <button className="patient-btn" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </IonContent>
  );
};

export default PatientProfile;
