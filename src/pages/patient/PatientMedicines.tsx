import React, { useState, useEffect } from "react";
import { IonContent, IonSpinner } from "@ionic/react";
import { api } from "../../api/axios";
import "./PatientPage.css";

interface Medicine {
  id: number;
  name: string;
  dosage: string;
  time: string;
  days: string[];
  stock: number | null;
  label: string | null;
}

const PatientMedicines: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    api.get("/my/medicines")
      .then(res => setMedicines(res.data))
      .catch(err => console.error("Error cargando medicinas:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <IonContent fullscreen className="patient-page">
        <div className="patient-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <IonSpinner name="crescent" />
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent fullscreen className="patient-page">
      <div className="patient-bubble b1"></div>
      <div className="patient-bubble b2"></div>

      <div className="patient-container">
        <h1 className="patient-title">Mis medicinas</h1>
        <p className="patient-subtitle">Asignadas por tu cuidador</p>

        {medicines.length === 0 ? (
          <div className="patient-card">
            <p>No tienes medicinas asignadas aún.</p>
          </div>
        ) : (
          medicines.map(med => (
            <div className="patient-card" key={med.id}>
              <h3>{med.name}</h3>
              <p>{med.dosage}</p>
              <p>⏱ {med.time || "Sin horario"} — {med.days?.length ? med.days.join(", ") : "Única vez"}</p>
              {med.stock !== null && (
                <p className={med.stock < 5 ? "low-stock" : ""}>
                  📦 Stock: {med.stock} {med.stock < 5 && "⚠️"}
                </p>
              )}
              {med.label && <p>📝 {med.label}</p>}
            </div>
          ))
        )}
      </div>
    </IonContent>
  );
};

export default PatientMedicines;
