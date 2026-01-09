import React, { useState, useEffect } from "react";
import { IonContent, IonSpinner } from "@ionic/react";
import { api } from "../../api/axios";
import "./PatientPage.css";

interface RobotStatus {
  id: number;
  status: string;
  wifi: boolean;
  batteryPct: number;
  updatedAt: string;
}

interface HistoryItem {
  id: number;
  status: string;
  dispensedAt: string;
  medicine: { name: string };
}

const PatientRobot: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [robotStatus, setRobotStatus] = useState<RobotStatus | null>(null);
  const [lastAction, setLastAction] = useState<HistoryItem | null>(null);
  const [dispensing, setDispensing] = useState(false);
  const [medicines, setMedicines] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statusRes, historyRes, medsRes] = await Promise.all([
        api.get("/my/robot"),
        api.get("/my/history?days=1"),
        api.get("/my/medicines"),
      ]);
      setRobotStatus(statusRes.data);
      setLastAction(historyRes.data[0] || null);
      setMedicines(medsRes.data);
    } catch (err) {
      console.error("Error cargando datos del robot:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDispense = async (medicineId: number) => {
    setDispensing(true);
    try {
      await api.post("/my/dispense", { medicineId });
      await loadData();
    } catch (err) {
      console.error("Error dispensando:", err);
      alert("Error al dispensar");
    } finally {
      setDispensing(false);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "OK": return "Listo para dispensar 💊";
      case "DISPENSANDO": return "Dispensando... ⏳";
      case "ERROR": return "Error en el robot ⚠️";
      default: return status;
    }
  };

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
        <h1 className="patient-title">Mi robot</h1>
        <p className="patient-subtitle">Controla tu dispensador</p>

        <div className="patient-card">
          <h3>Estado</h3>
          {robotStatus ? (
            <>
              <p>WiFi: {robotStatus.wifi ? "Conectado 📶" : "Desconectado ❌"}</p>
              <p>Batería: {robotStatus.batteryPct}% 🔋</p>
              <p>{getStatusText(robotStatus.status)}</p>
            </>
          ) : (
            <p>No se pudo obtener el estado del robot</p>
          )}
        </div>

        {medicines.length > 0 && (
          <div className="patient-card">
            <h3>Dispensar medicina</h3>
            {medicines.map(med => (
              <button
                key={med.id}
                className="patient-btn"
                onClick={() => handleDispense(med.id)}
                disabled={dispensing || robotStatus?.status !== "OK"}
                style={{ marginBottom: "0.5rem", width: "100%" }}
              >
                {dispensing ? "Dispensando..." : `💊 ${med.name}`}
              </button>
            ))}
          </div>
        )}

        {lastAction && (
          <div className="patient-card">
            <h3>Última acción</h3>
            <p>
              {lastAction.status === "TAKEN" ? "✅ Tomada" : "💊 Dispensada"} — {lastAction.medicine.name}
              <br />
              {new Date(lastAction.dispensedAt).toLocaleString("es-ES")}
            </p>
          </div>
        )}
      </div>
    </IonContent>
  );
};

export default PatientRobot;
