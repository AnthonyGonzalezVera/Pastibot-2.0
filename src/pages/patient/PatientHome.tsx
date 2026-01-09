import React, { useState, useEffect } from "react";
import { IonContent, IonSpinner } from "@ionic/react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../api/axios";
import "./PatientPage.css";

interface Reminder {
  id: number;
  time: string;
  medicineName: string;
  medicineDosage: string;
  medicineId: number;
}

interface HistoryItem {
  id: number;
  status: string;
  dispensedAt: string;
  medicine: { name: string };
}

const PatientHome: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [todayHistory, setTodayHistory] = useState<HistoryItem[]>([]);
  const [dispensing, setDispensing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [remindersRes, historyRes] = await Promise.all([
        api.get("/my/reminders"),
        api.get("/my/history?days=1"),
      ]);
      setReminders(remindersRes.data);
      setTodayHistory(historyRes.data);
    } catch (err) {
      console.error("Error cargando datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDispense = async (medicineId: number) => {
    setDispensing(true);
    try {
      await api.post("/my/dispense", { medicineId });
      await loadData(); // Reload to show updated history
    } catch (err) {
      console.error("Error dispensando:", err);
      alert("Error al dispensar medicamento");
    } finally {
      setDispensing(false);
    }
  };

  const nextReminder = reminders[0];
  const completedToday = todayHistory.filter(h => h.status === "TAKEN" || h.status === "DISPENSED").length;
  const totalToday = reminders.length;

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
      <div className="patient-bubble b3"></div>

      <div className="patient-container">
        <h1 className="patient-title">Hola, {user?.name?.split(" ")[0] || "Paciente"} 👋</h1>
        <p className="patient-subtitle">Tu resumen de hoy</p>

        <div className="patient-card">
          <h3>Próxima toma</h3>
          {nextReminder ? (
            <p>{nextReminder.medicineName} — {nextReminder.time}</p>
          ) : (
            <p>No hay recordatorios pendientes ✅</p>
          )}
        </div>

        <div className="patient-card">
          <h3>Progreso diario</h3>
          <p>{completedToday} de {totalToday} dosis completadas {completedToday === totalToday && totalToday > 0 ? "✅" : ""}</p>
        </div>

        {nextReminder && (
          <button
            className="patient-btn"
            onClick={() => handleDispense(nextReminder.medicineId)}
            disabled={dispensing}
          >
            {dispensing ? "Dispensando..." : "Tomar ahora"}
          </button>
        )}
      </div>
    </IonContent>
  );
};

export default PatientHome;
