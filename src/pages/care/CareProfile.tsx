import React, { useState } from "react";
import { IonContent } from "@ionic/react";
import "./CarePage.css";

const CareProfile: React.FC = () => {
  const [photo, setPhoto] = useState("/assets/default-avatar.png");
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const [tempBio, setTempBio] = useState("");
  const [gender, setGender] = useState("Hombre");
  const [showOptions, setShowOptions] = useState(false); // para el menú de género

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

  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b3" />

      <div className="care-container">
        {!editing ? (
          <>
            <img
              src={photo}
              alt="Foto de perfil"
              className="profile-avatar"
              onClick={handlePhotoChange}
            />

            <h2 className="care-title">Anthony González</h2>
            <p className="care-subtitle">Cuidador • anthony@pastibot.com</p>

            <div style={{ display: "flex", gap: "40px", margin: "12px 0" }}>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ color: "#0288d1" }}>5</h3>
                <p>Pacientes</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ color: "#0288d1" }}>3</h3>
                <p>Activos</p>
              </div>
            </div>

            <div className="profile-bio">
              {bio ? (
                <p>{bio}</p>
              ) : (
                <p style={{ fontStyle: "italic", color: "#777" }}>
                  Sin biografía todavía.
                </p>
              )}
            </div>

            <button className="care-btn" onClick={() => setEditing(true)}>
              Editar perfil
            </button>

            <button
              className="care-btn"
              style={{ background: "linear-gradient(135deg, #e53935, #c62828)" }}
              onClick={() => alert("Cerrar sesión (simulado)")}
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <div className="edit-profile-card">
            <h2 className="care-title">Editar perfil</h2>

            <div className="edit-photo">
              <img
                src={photo}
                alt="Foto de perfil"
                className="profile-avatar"
                onClick={handlePhotoChange}
              />
              <button className="care-btn small" onClick={handlePhotoChange}>
                Cambiar foto
              </button>
            </div>

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

            <div className="edit-actions">
              <button
                className="care-btn outline"
                onClick={() => setEditing(false)}
              >
                Cancelar
              </button>
              <button className="care-btn" onClick={handleSave}>
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </IonContent>
  );
};

export default CareProfile;
