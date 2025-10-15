import React, { useState } from "react";
import {
  IonContent,
  IonModal,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonToggle,
  IonDatetime
} from "@ionic/react";
import "./CarePage.css";

type Med = {
  id: number;
  name: string;
  dosage: string;
  time: string;    // HH:mm
  days: string[];  // ["Lu", "Ma"...]
  stock?: number;
};

const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

const CareMedicines: React.FC = () => {
  const [meds, setMeds] = useState<Med[]>([
    { id: 1, name: "Ibuprofeno", dosage: "1 tableta cada 8 horas", time: "08:00", days: DAYS },
    { id: 2, name: "Amoxicilina", dosage: "2 cápsulas diarias — 5 días restantes", time: "12:00", days: ["Lu","Ma","Mi","Ju","Vi"] },
  ]);

  const [open, setOpen] = useState(false);
  const [manualName, setManualName] = useState("");
  const [manualDose, setManualDose] = useState("1 tableta");
  const [manualTime, setManualTime] = useState("08:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Lu","Ma","Mi","Ju","Vi"]);
  const [label, setLabel] = useState("");
  const [repeat, setRepeat] = useState(true);

  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]
    );
  };

  const saveMed = () => {
    if (!manualName.trim()) {
      alert("El nombre del medicamento es obligatorio.");
      return;
    }
    const newMed: Med = {
      id: Date.now(),
      name: manualName.trim(),
      dosage: `${manualDose}${label ? ` — ${label}` : ""}`,
      time: manualTime.substring(11,16) || "08:00",
      days: repeat ? selectedDays : [],
    };
    setMeds([newMed, ...meds]);
    setOpen(false);
    // reset
    setManualName(""); setManualDose("1 tableta"); setManualTime("08:00");
    setSelectedDays(["Lu","Ma","Mi","Ju","Vi"]); setLabel(""); setRepeat(true);
  };

  const handleQR = () => {
    alert("Escanear código (integrar @capacitor-community/barcode-scanner)");
  };

  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />

      <div className="care-container">
        <h1 className="care-title">
          Medicamentos <span role="img" aria-label="pill">💊</span>
        </h1>
        <p className="care-subtitle">Gestiona y añade tus medicinas</p>

        <IonButton className="qr-btn" onClick={handleQR}>📷 QR</IonButton>

        <button className="care-btn" onClick={() => setOpen(true)}>
          + Añadir medicamento
        </button>

        {meds.map((m) => (
          <div className="care-card" key={m.id}>
            <h3>{m.name}</h3>
            <p>{m.dosage}</p>
            <p>⏱ {m.time} — {m.days.length ? m.days.join(" ") : "Una sola vez"}</p>
            <button
              className="care-btn"
              onClick={() => alert(`Dispensar ahora: ${m.name} (simulado)`)}
            >
              Dispensar ahora
            </button>
          </div>
        ))}
      </div>

      {/* Modal para añadir manualmente */}
      <IonModal
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        className="med-modal"
      >
        <div className="modal-inner">
          <h2 className="modal-title">Añadir medicamento</h2>
          <p className="modal-subtitle">Configura horario y repetición</p>

          <div className="form-grid">
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput
                placeholder="Paracetamol"
                value={manualName}
                onIonInput={(e) => setManualName(String(e.detail.value))}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Dosis</IonLabel>
              <IonInput
                placeholder="1 tableta"
                value={manualDose}
                onIonInput={(e) => setManualDose(String(e.detail.value))}
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Hora</IonLabel>
              <IonDatetime
                presentation="time"
                preferWheel={true}
                hourCycle="h12"
                value={`2024-01-01T${manualTime}`}
                onIonChange={(e) => setManualTime(String(e.detail.value))}
              />
            </IonItem>

            <IonItem lines="none">
              <IonLabel>Repetir</IonLabel>
              <IonToggle
                checked={repeat}
                onIonChange={(e) => setRepeat(e.detail.checked)}
              />
            </IonItem>

            {repeat && (
              <>
                <div className="days-grid">
                  {DAYS.map((d) => (
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
                  <IonLabel position="stacked">Etiqueta (opcional)</IonLabel>
                  <IonInput
                    placeholder="Después de almuerzo"
                    value={label}
                    onIonInput={(e) => setLabel(String(e.detail.value))}
                  />
                </IonItem>
              </>
            )}
          </div>

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
