import React, { useState, useEffect } from "react";
import { IonContent, IonSpinner } from "@ionic/react";
import { api } from "../../api/axios";
import "./CarePage.css";

interface RobotStatus {
  status: string;
  wifi: boolean;
  batteryPct: number;
  updatedAt: string;
}

interface Patient {
  id: number;
  name: string;
  medicines: { id: number; name: string }[];
}

const CareControl: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [robotStatus, setRobotStatus] = useState<RobotStatus | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [dispensing, setDispensing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statusRes, patientsRes] = await Promise.all([
        api.get("/robot/status"),
        api.get("/patients"),
      ]);
      setRobotStatus(statusRes.data);

      // Load medicines for each patient
      const patientsWithMeds = await Promise.all(
        patientsRes.data.map(async (p: any) => {
          const medsRes = await api.get(`/patients/${p.id}/medicines`);
          return { ...p, medicines: medsRes.data };
        })
      );
      setPatients(patientsWithMeds);

      if (patientsWithMeds.length > 0) {
        setSelectedPatient(patientsWithMeds[0].id);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDispense = async (medicineId: number) => {
    setDispensing(true);
    try {
      await api.post("/robot/dispense", { medicineId, amount: 1 });
      await loadData();
      alert("Medicamento dispensado correctamente");
    } catch (err) {
      console.error("Error dispensando:", err);
      alert("Error al dispensar");
    } finally {
      setDispensing(false);
    }
  };

  const currentPatient = patients.find(p => p.id === selectedPatient);

  if (loading) {
    return (
      <IonContent fullscreen className="care-page">
        <div className="care-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "50vh" }}>
          <IonSpinner name="crescent" />
        </div>
      </IonContent>
    );
  }

  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />

      <div className="care-container">
        <h1 className="care-title">Control del robot 🤖</h1>
        <p className="care-subtitle">Monitorea y controla el dispensador</p>

        <div className="care-card">
          <h3>Estado general</h3>
          {robotStatus ? (
            <>
              <p>WiFi: {robotStatus.wifi ? "Conectado 📶" : "Desconectado ❌"}</p>
              <p>Batería: {robotStatus.batteryPct}% 🔋</p>
              <p>Estado: {robotStatus.status === "OK" ? "Listo ✅" : robotStatus.status}</p>
              <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                Última actualización: {new Date(robotStatus.updatedAt).toLocaleString("es-ES")}
              </p>
            </>
          ) : (
            <p>No se pudo conectar con el robot</p>
          )}
        </div>

        {patients.length > 0 && (
          <div className="care-card">
            <h3>Dispensar medicamento</h3>

            <select
              value={selectedPatient || ""}
              onChange={e => setSelectedPatient(Number(e.target.value))}
              className="care-select"
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem", borderRadius: "8px" }}
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            {currentPatient?.medicines.length === 0 ? (
              <p>No hay medicamentos asignados</p>
            ) : (
              currentPatient?.medicines.map(med => (
                <button
                  key={med.id}
                  className="care-btn"
                  onClick={() => handleDispense(med.id)}
                  disabled={dispensing || robotStatus?.status !== "OK"}
                  style={{ marginBottom: "0.5rem", width: "100%" }}
                >
                  {dispensing ? "Dispensando..." : `💊 ${med.name}`}
                </button>
              ))
            )}
          </div>
        )}

        <div className="care-card">
          <h3>Pruebas rápidas</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.7 }}>
            Estas acciones requieren conexión directa con el ESP32
          </p>
          <div className="row" style={{ gap: "0.5rem", marginTop: "0.5rem" }}>
            <button className="care-btn outline" onClick={() => alert("Función disponible con ESP32 conectado")}>
              Probar servos
            </button>
            <button className="care-btn outline" onClick={() => alert("Función disponible con ESP32 conectado")}>
              Luces LED
            </button>
          </div>
        </div>
      </div>
    </IonContent>
  );
};

export default CareControl;
