import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonModal,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonToggle,
  IonDatetime,
} from "@ionic/react";
import "./CarePage.css";
import { IoQrCodeOutline } from "react-icons/io5";
import { api } from "../../api/axios";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";

const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

type Med = {
  id: number;
  name: string;
  dosage: string;
  time: string;
  days: string[];
};

const CareMedicines: React.FC = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const { token } = useAuth();

  const [meds, setMeds] = useState<Med[]>([]);
  const [open, setOpen] = useState(false);

  const [manualName, setManualName] = useState("");
  const [manualDose, setManualDose] = useState("1 tableta");
  const [manualTime, setManualTime] = useState("08:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Lu","Ma","Mi","Ju","Vi"]);
  const [label, setLabel] = useState("");
  const [repeat, setRepeat] = useState(true);

  // 🚀 TRAER MEDICAMENTOS REALES AL CARGAR
  useEffect(() => {
    if (!token) return;

    api.get(`/patients/${patientId}/medicines`)
      .then(res => {
        setMeds(res.data);
      })
      .catch(err => {
        console.error("Error cargando medicinas:", err);
      });

  }, [patientId, token]);

  const toggleDay = (d: string) => {
    setSelectedDays(prev =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  // 🚀 GUARDAR MEDICAMENTO REAL
  const saveMed = async () => {
    if (!manualName.trim()) {
      alert("El nombre del medicamento es obligatorio.");
      return;
    }

    const payload = {
      name: manualName.trim(),
      dosage: manualDose,
      time: manualTime.substring(11, 16) || "08:00",
      days: repeat ? selectedDays : [],
      label,
    };

    try {
      const res = await api.post(
        `/patients/${patientId}/medicines`,
        payload
      );

      setMeds([res.data, ...meds]); // añade a la lista real
      setOpen(false);

      // limpiar
      setManualName("");
      setManualDose("1 tableta");
      setManualTime("08:00");
      setSelectedDays(["Lu","Ma","Mi","Ju","Vi"]);
      setLabel("");
      setRepeat(true);

    } catch (err) {
      console.error("Error guardando medicina:", err);
      alert("Error al guardar medicina");
    }
  };

  const handleQR = () => {
    alert("Escanear código QR (falta integrar scanner)");
  };

  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />

      <div className="care-container">
        <h1 className="care-title">Medicamentos</h1>
        <p className="care-subtitle">Gestiona y añade tus medicinas</p>

        <IonButton className="qr-btn" onClick={handleQR}>
          <IoQrCodeOutline style={{ fontSize: "1.3rem", marginRight: "6px" }} />
        </IonButton>

        <button className="care-btn" onClick={() => setOpen(true)}>
          + Añadir medicamento
        </button>

        {meds.map(m => (
          <div className="care-card" key={m.id}>
            <h3>{m.name}</h3>
            <p>{m.dosage}</p>
            <p>⏱ {m.time} — {m.days.length ? m.days.join(" ") : "Única vez"}</p>
          </div>
        ))}
      </div>

      <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} className="med-modal">
        <div className="modal-inner">
          <h2 className="modal-title">Añadir medicamento</h2>
          <p className="modal-subtitle">Configura horario y repetición</p>

          <IonItem>
            <IonLabel position="stacked">Nombre</IonLabel>
            <IonInput
              placeholder="Paracetamol"
              value={manualName}
              onIonInput={e => setManualName(String(e.detail.value))}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Dosis</IonLabel>
            <IonInput
              value={manualDose}
              onIonInput={e => setManualDose(String(e.detail.value))}
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Hora</IonLabel>
            <IonDatetime
              presentation="time"
              value={`2024-01-01T${manualTime}`}
              onIonChange={e => setManualTime(String(e.detail.value))}
            />
          </IonItem>

          <IonItem lines="none">
            <IonLabel>Repetir</IonLabel>
            <IonToggle checked={repeat} onIonChange={e => setRepeat(e.detail.checked)} />
          </IonItem>

          {repeat && (
            <>
              <div className="days-grid">
                {DAYS.map(d => (
                  <div
                    key={d}
                    className={`day-chip ${selectedDays.includes(d) ? "active" : ""}`}
                    onClick={() => toggleDay(d)}
                  >
                    {d}
                  </div>
                ))}
              </div>

              <IonItem>
                <IonLabel position="stacked">Etiqueta</IonLabel>
                <IonInput
                  placeholder="Después del almuerzo"
                  value={label}
                  onIonInput={e => setLabel(String(e.detail.value))}
                />
              </IonItem>
            </>
          )}

          <div className="modal-actions">
            <button className="care-btn outline" onClick={() => setOpen(false)}>
              Cancelar
            </button>
            <button className="care-btn" onClick={saveMed}>
              Guardar
            </button>
          </div>
        </div>
      </IonModal>
    </IonContent>
  );
};

export default CareMedicines;
