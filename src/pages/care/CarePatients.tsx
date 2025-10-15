import React, { useState } from "react";
import {
  IonContent,
  IonModal,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonSegment,
  IonSegmentButton
} from "@ionic/react";
import "./CarePage.css";

type Patient = { id: number; name: string; status: "activo"|"pendiente"; info?: string; };

const CarePatients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { id: 1, name: "María López", status: "activo", info: "Paciente vinculada" },
    { id: 2, name: "Juan Pérez", status: "pendiente", info: "Invitación enviada" },
  ]);

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"wa"|"manual">("wa");

  // Manual
  const [name, setName] = useState("");
  const [age, setAge] = useState<string | number>("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");

  const inviteWhatsapp = () => {
    const link = "https://app.pastibot.com/invite?token=XYZ123";
    alert(`Compartir enlace por WhatsApp:\n${link}`);
  };

  const saveManual = () => {
    if (!name.trim()) { alert("Nombre obligatorio"); return; }
    setPatients([{ id: Date.now(), name, status: "pendiente", info: `${age} años • ${gender} • ${condition}` }, ...patients]);
    setOpen(false);
    setName(""); setAge(""); setGender(""); setCondition("");
  };

  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />

      <div className="care-container">
        <h1 className="care-title">
          Pacientes <span role="img" aria-label="people">👥</span>
        </h1>
        <p className="care-subtitle">Invita por WhatsApp o edita vínculos</p>

        <button className="care-btn" onClick={() => setOpen(true)}>
          + Invitar paciente
        </button>

        {patients.map((p) => (
          <div className="care-card" key={p.id} onClick={() => alert(`Detalle ${p.name} (historial y config)`)} style={{cursor:"pointer"}}>
            <h3>{p.name}</h3>
            <p>{p.info ?? ""}</p>
            <p>{p.status === "activo" ? "✅ Activo" : "🕓 Pendiente"}</p>
          </div>
        ))}
      </div>

      {/* Modal de invitación */}
      <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} className="invite-modal">
        <div className="modal-inner">
          <h2 className="modal-title">Añadir paciente</h2>

          <IonSegment value={tab} onIonChange={e => setTab(e.detail.value as "wa"|"manual")}>
            <IonSegmentButton value="wa">WhatsApp</IonSegmentButton>
            <IonSegmentButton value="manual">Manual</IonSegmentButton>
          </IonSegment>

          {tab === "wa" ? (
            <>
              <p className="modal-subtitle">Genera un enlace seguro y compártelo por WhatsApp</p>
              <div className="modal-actions">
                <button className="care-btn" onClick={inviteWhatsapp}>Generar y compartir</button>
                <button className="care-btn outline" onClick={() => setOpen(false)}>Cerrar</button>
              </div>
            </>
          ) : (
            <>
              <p className="modal-subtitle">Completa los datos del paciente</p>
              <div className="form-grid">
                <IonItem>
                  <IonLabel position="stacked">Nombres completos</IonLabel>
                  <IonInput value={name} onIonInput={e => setName(String(e.detail.value))} />
                </IonItem>
                <div className="row">
                  <IonItem>
                    <IonLabel position="stacked">Edad</IonLabel>
                    <IonInput type="number" value={age} onIonInput={e => setAge(Number(e.detail.value))} />
                  </IonItem>
                  <IonItem>
                    <IonLabel position="stacked">Género</IonLabel>
                    <IonInput placeholder="Masculino/Femenino" value={gender} onIonInput={e => setGender(String(e.detail.value))} />
                  </IonItem>
                </div>
                <IonItem>
                  <IonLabel position="stacked">Enfermedad/Condición</IonLabel>
                  <IonInput placeholder="(Opcional)" value={condition} onIonInput={e => setCondition(String(e.detail.value))} />
                </IonItem>
              </div>
              <div className="modal-actions">
                <button className="care-btn outline" onClick={() => setOpen(false)}>Cancelar</button>
                <button className="care-btn" onClick={saveManual}>Guardar</button>
              </div>
            </>
          )}
        </div>
      </IonModal>
    </IonContent>
  );
};

export default CarePatients;
