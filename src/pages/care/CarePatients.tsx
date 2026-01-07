import React, { useState, useEffect } from "react";
import {
  IonContent,
  IonModal,
  IonButton,
  IonItem,
  IonInput,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import "./CarePage.css";
import { api } from "../../api/axios";
import { useHistory } from "react-router";
import { useAuth } from "../../context/AuthContext";

type Patient = {
  id: number;
  name: string;
  age?: number;
  gender?: string;
  condition?: string;
};

const CarePatients: React.FC = () => {
  const history = useHistory();
  const { token } = useAuth();

  const [patients, setPatients] = useState<Patient[]>([]);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"wa" | "manual">("wa");

  // Manual fields
  const [name, setName] = useState("");
  const [age, setAge] = useState<string | number>("");
  const [gender, setGender] = useState("");
  const [condition, setCondition] = useState("");

  // 🚀 Cargar pacientes del backend
  useEffect(() => {
    if (!token) return;

    api
      .get("/patients")
      .then((res) => {
        setPatients(res.data);
      })
      .catch((err) => console.error("Error cargando pacientes:", err));
  }, [token]);

  // 📌 Crear paciente manual
  const saveManual = async () => {
    if (!name.trim()) {
      alert("El nombre es obligatorio");
      return;
    }

    try {
      const body = {
        name: name.trim(),
        age: age ? Number(age) : null,
        gender: gender || null,
        condition: condition || null,
      };

      const res = await api.post("/patients", body);

      setPatients([res.data, ...patients]);

      // limpiar
      setOpen(false);
      setName("");
      setAge("");
      setGender("");
      setCondition("");
    } catch (error) {
      console.error("Error creando paciente:", error);
      alert("Error al crear paciente");
    }
  };

  // 🚀 Ir a medicamentos por paciente REAL
  const openMedicines = (id: number) => {
    history.push(`/care/medicines/${id}`);
  };

  const inviteWhatsapp = async () => {
  try {
    const res = await api.post("/invitations/generate", {
      patientName: name || undefined,
    });

    const message = encodeURIComponent(
      `Hola 👋\nTe invito a usar Pastibot 💊\nAcepta aquí 👉 ${res.data.invitationLink}`
    );

    window.open(`https://wa.me/?text=${message}`, "_blank");
    setOpen(false);
  } catch (err) {
    console.error("Error generando invitación:", err);
    alert("No se pudo generar la invitación");
  }
};


  return (
    <IonContent fullscreen className="care-page">
      <div className="care-bubble b1" />
      <div className="care-bubble b2" />

      <div className="care-container">
        <h1 className="care-title">Pacientes</h1>
        <p className="care-subtitle">Invita o administra pacientes</p>

        <button className="care-btn" onClick={() => setOpen(true)}>
          + Invitar paciente
        </button>

        {patients.map((p) => (
          <div
            className="care-card"
            key={p.id}
            onClick={() => openMedicines(p.id)}
            style={{ cursor: "pointer" }}
          >
            <h3>{p.name}</h3>
            <p>{p.age ? `${p.age} años` : ""}</p>
            <p>{p.condition ?? ""}</p>
          </div>
        ))}
      </div>

      {/* Modal nuevo paciente */}
      <IonModal
        isOpen={open}
        onDidDismiss={() => setOpen(false)}
        className="invite-modal"
      >
        <div className="modal-inner">
          <h2 className="modal-title">Añadir paciente</h2>

          <IonSegment
            value={tab}
            onIonChange={(e) => setTab(e.detail.value as "wa" | "manual")}
          >
            <IonSegmentButton value="wa">WhatsApp</IonSegmentButton>
            <IonSegmentButton value="manual">Manual</IonSegmentButton>
          </IonSegment>

          {tab === "wa" ? (
            <>
              <p className="modal-subtitle">
                Genera un enlace seguro y compártelo por WhatsApp
              </p>

              <div className="modal-actions">
                <button className="care-btn" onClick={inviteWhatsapp}>
                  Generar y compartir
                </button>
                <button
                  className="care-btn outline"
                  onClick={() => setOpen(false)}
                >
                  Cerrar
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="modal-subtitle">Completa los datos del paciente</p>

              <div className="form-grid">
                <IonItem>
                  <IonLabel position="stacked">Nombres completos</IonLabel>
                  <IonInput
                    value={name}
                    onIonInput={(e) => setName(String(e.detail.value))}
                  />
                </IonItem>

                <div className="row">
                  <IonItem>
                    <IonLabel position="stacked">Edad</IonLabel>
                    <IonInput
                      type="number"
                      value={age}
                      onIonInput={(e) => setAge(e.detail.value ?? "")}
                    />
                  </IonItem>

                  <IonItem>
                    <IonLabel position="stacked">Género</IonLabel>
                    <IonInput
                      placeholder="Masculino/Femenino"
                      value={gender}
                      onIonInput={(e) => setGender(String(e.detail.value))}
                    />
                  </IonItem>
                </div>

                <IonItem>
                  <IonLabel position="stacked">Enfermedad/Condición</IonLabel>
                  <IonInput
                    placeholder="(Opcional)"
                    value={condition}
                    onIonInput={(e) => setCondition(String(e.detail.value))}
                  />
                </IonItem>
              </div>

              <div className="modal-actions">
                <button
                  className="care-btn outline"
                  onClick={() => setOpen(false)}
                >
                  Cancelar
                </button>
                <button className="care-btn" onClick={saveManual}>
                  Guardar
                </button>
              </div>
            </>
          )}
        </div>
      </IonModal>
    </IonContent>
  );
};

export default CarePatients;
