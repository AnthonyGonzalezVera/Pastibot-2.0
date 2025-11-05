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
  IonPage,
  IonList,
  IonIcon,
} from "@ionic/react";
import { medicalOutline, timeOutline, cubeOutline, closeOutline } from "ionicons/icons";
import { IoQrCodeOutline } from "react-icons/io5";
import { MedicinesAPI, Medicine } from "../../services/medicines.service";
import "./CareMedicines.css";

const DAYS = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

const CareMedicines: React.FC = () => {
  const [meds, setMeds] = useState<Medicine[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showDelete, setShowDelete] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [manualName, setManualName] = useState("");
  const [manualDose, setManualDose] = useState("1 tableta");
  const [manualTime, setManualTime] = useState("08:00");
  const [selectedDays, setSelectedDays] = useState<string[]>(["Lu", "Ma", "Mi", "Ju", "Vi"]);
  const [label, setLabel] = useState("");
  const [repeat, setRepeat] = useState(true);
  const patientId = 3;
  const caregiverId = 2;

  useEffect(() => {
    loadMeds();
  }, []);

  const loadMeds = async () => {
    try {
      const data = await MedicinesAPI.listByPatient(patientId);
      setMeds(data);
    } catch (err) {
      console.error("Error al cargar medicinas:", err);
    }
  };

  const refresh = async () => {
    const data = await MedicinesAPI.listByPatient(patientId);
    setMeds(data);
  };

  const resetForm = () => {
    setManualName("");
    setManualDose("1 tableta");
    setManualTime("08:00");
    setSelectedDays(["Lu", "Ma", "Mi", "Ju", "Vi"]);
    setLabel("");
    setRepeat(true);
    setIsEditing(false);
    setEditingId(null);
  };

  const openCreate = () => {
    resetForm();
    setOpen(true);
  };

  const openEdit = (m: Medicine) => {
    setIsEditing(true);
    setEditingId(m.id);
    setManualName(m.name || "");
    setManualDose(m.dosage || "");
    setOpen(true);
  };

  const toggleDay = (d: string) => {
    setSelectedDays((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  };

  const saveMed = async () => {
    if (!manualName.trim()) {
      alert("El nombre del medicamento es obligatorio.");
      return;
    }
    const payload = {
      name: manualName.trim(),
      dosage: manualDose,
      stock: 10,
      patientId,
      caregiverId,
    };
    try {
      if (isEditing && editingId) {
        await MedicinesAPI.update(editingId, {
          name: payload.name,
          dosage: payload.dosage,
          stock: payload.stock,
        });
      } else {
        await MedicinesAPI.create(payload);
      }
      setOpen(false);
      resetForm();
      await refresh();
      alert("✅ Cambios guardados.");
    } catch {
      alert("❌ Error al guardar.");
    }
  };

  const handleDispense = async (id: number) => {
    try {
      const res = await MedicinesAPI.dispenseNow(id);
      alert(res.message);
    } catch {
      alert("❌ Error al dispensar el medicamento.");
    }
  };

  const askDelete = (id: number) => {
    setPendingDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      await MedicinesAPI.delete(pendingDeleteId);
      await refresh();
      alert("🗑️ Medicamento eliminado.");
    } catch {
      alert("❌ No se pudo eliminar.");
    } finally {
      setPendingDeleteId(null);
      setShowDelete(false);
    }
  };

  const handleQR = () => {
    alert("Escanear código (integrar @capacitor-community/barcode-scanner)");
  };

  return (
    <IonPage>
      <IonContent fullscreen className="care-page">
        <div className="care-bubble b1" />
        <div className="care-bubble b2" />

        <div className="care-container">
          <h1 className="care-title">Medicamentos</h1>
          <p className="care-subtitle">Gestiona y añade tus medicinas</p>

          <IonButton className="qr-btn" onClick={handleQR}>
            <IoQrCodeOutline style={{ fontSize: "1.3rem", marginRight: "6px" }} />
            Escanear QR
          </IonButton>

          <button className="care-btn" onClick={openCreate}>
            + Añadir medicamento
          </button>

          <IonList className="medicines-list">
            {meds.map((m) => (
              <div className="medicine-card" key={m.id}>
                <button
                  aria-label="Eliminar"
                  className="card-close"
                  onClick={() => askDelete(m.id)}
                >
                  <IonIcon icon={closeOutline} />
                </button>

                <div className="medicine-clickable" onClick={() => openEdit(m)}>
                  <div className="medicine-card-header">
                    <div className="medicine-icon">
                      <IonIcon icon={medicalOutline} />
                    </div>
                    <h3 className="medicine-title">{m.name}</h3>
                  </div>

                  <div className="medicine-body">
                    <p className="medicine-dosage">{m.dosage}</p>

                    <div className="medicine-info">
                      <IonIcon icon={timeOutline} className="icon" />
                      <span>
                        {m.createdAt
                          ? new Date(m.createdAt as unknown as string).toLocaleString("es-EC", {
                              day: "2-digit",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Sin horario"}
                      </span>
                    </div>

                    <div className="medicine-info">
                      <IonIcon icon={cubeOutline} className="icon" />
                      <span>
                        Stock: <strong>{m.stock ?? 0}</strong> unidades
                      </span>
                    </div>
                  </div>
                </div>

                <div className="medicine-footer">
                  <IonButton
                    expand="block"
                    className="dispense-btn"
                    onClick={() => handleDispense(m.id)}
                  >
                    <IonIcon icon={cubeOutline} slot="start" />
                    Dispensar ahora
                  </IonButton>
                </div>
              </div>
            ))}
          </IonList>
        </div>

        <IonModal isOpen={open} onDidDismiss={() => setOpen(false)} className="med-modal">
          <div className="modal-inner">
            <h2 className="modal-title">{isEditing ? "Editar medicamento" : "Añadir medicamento"}</h2>
            <p className="modal-subtitle">Configura nombre, dosis y horario</p>

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
                <IonToggle checked={repeat} onIonChange={(e) => setRepeat(e.detail.checked)} />
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
                {isEditing ? "Guardar cambios" : "Guardar"}
              </button>
            </div>
          </div>
        </IonModal>

        {showDelete && (
          <div className="pastibot-alert-backdrop">
            <div className="pastibot-alert">
              <div className="alert-icon">⚠️</div>
              <h2>Eliminar medicamento</h2>
              <p>¿Seguro que quieres eliminar este medicamento?</p>
              <div className="alert-actions">
                <button className="btn-cancel" onClick={() => setShowDelete(false)}>
                  Cancelar
                </button>
                <button className="btn-delete" onClick={confirmDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CareMedicines;
