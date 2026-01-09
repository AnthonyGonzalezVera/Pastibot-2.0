import React, { useState, useEffect } from "react";
import { IonContent, IonSpinner } from "@ionic/react";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/axios";
import "./CarePage.css";

interface Patient {
  id: number;
  name: string;
}

interface RobotStatus {
  status: string;
  wifi: boolean;
  batteryPct: number;
}

const CareHome: React.FC = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [robotStatus, setRobotStatus] = useState<RobotStatus | null>(null);
  const [recentLogs, setRecentLogs] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [patientsRes, robotRes, logsRes] = await Promise.all([
        api.get("/patients"),
        api.get("/robot/status"),
        api.get("/robot/logs?limit=5"),
      ]);
      setPatients(patientsRes.data);
      setRobotStatus(robotRes.data);
      setRecentLogs(logsRes.data);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const getAlertStatus = () => {
    if (!robotStatus) return { text: "Sin conexión con robot", icon: "⚠️" };
    if (robotStatus.status === "ERROR") return { text: "Robot con problemas", icon: "🔴" };
    if (robotStatus.batteryPct < 20) return { text: "Batería baja", icon: "🔋" };
    if (!robotStatus.wifi) return { text: "Robot sin WiFi", icon: "📶" };
    return { text: "Todo en orden", icon: "✅" };
  };

  const alert = getAlertStatus();

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
      <div className="care-bubble b3" />

      <div className="care-container">
        <h1 className="care-title">Hola, {user?.name?.split(" ")[0] || "Cuidador"} 👋</h1>
        <p className="care-subtitle">Resumen del sistema</p>

        <div className="care-card">
          <h3>Pacientes activos</h3>
          <p>{patients.length} paciente{patients.length !== 1 ? "s" : ""} registrado{patients.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="care-card">
          <h3>Estado del robot</h3>
          {robotStatus ? (
            <>
              <p>📶 WiFi: {robotStatus.wifi ? "Conectado" : "Desconectado"}</p>
              <p>🔋 Batería: {robotStatus.batteryPct}%</p>
              <p>📊 Estado: {robotStatus.status}</p>
            </>
          ) : (
            <p>No disponible</p>
          )}
        </div>

        <div className="care-card">
          <h3>Alertas</h3>
          <p>{alert.icon} {alert.text}</p>
        </div>

        {recentLogs.length > 0 && (
          <div className="care-card">
            <h3>Actividad reciente</h3>
            {recentLogs.slice(0, 3).map((log, i) => (
              <p key={i} style={{ fontSize: "0.9rem" }}>
                {new Date(log.createdAt).toLocaleString("es-ES", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "short" })} — {log.message.substring(0, 40)}...
              </p>
            ))}
          </div>
        )}

        <button
          className="care-btn"
          onClick={() => history.push("/care/control")}
        >
          Control del robot
        </button>
      </div>
    </IonContent>
  );
};

export default CareHome;
