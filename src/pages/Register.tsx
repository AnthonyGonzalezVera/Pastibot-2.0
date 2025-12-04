import React, { useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { api, setAuthToken } from "../api/axios";
import "./Register.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState("");

  // ============================
  //  VALIDACIONES PROFESIONALES
  // ============================
  const validarFormulario = () => {
    setError("");

    if (/\d/.test(name)) {
      setError("El nombre no puede contener números.");
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setError("Ingresa un correo electrónico válido.");
      return false;
    }

    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return false;
    }

    if (pass !== confirm) {
      setError("Las contraseñas no coinciden.");
      return false;
    }

    return true;
  };

  // =============================
  //  📌 REGISTRO REAL AL BACKEND
  // =============================
  const handleRegister = async () => {
    if (!validarFormulario()) return;

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password: pass,
        gender: null,
        role: null
      });

      const token = res.data.accessToken;

      // Guardamos token
      localStorage.setItem("token", token);
      setAuthToken(token);

      // Redirigimos como Google login
      window.location.href = "/selectrole";

    } catch (err: any) {
      const msg = err?.response?.data?.message;

      if (msg?.includes("El correo ya está registrado")) {
        setError("Ese correo ya está en uso.");
        return;
      }

      console.log(err);
      setError("Error al registrar usuario.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="register-page">
        <div className="top-shape"></div>
        <div className="bottom-shape"></div>

        <div className="register-container">
          <h1 className="title">Crear una cuenta</h1>
          <p className="subtitle">Regístrate para empezar a usar Pastibot</p>

          {error && (
            <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
          )}

          <form className="register-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              type="button"
              className="register-btn"
              onClick={handleRegister}
            >
              CREAR UNA CUENTA
            </button>
          </form>

          <p className="signin-text">
            ¿Ya tienes una cuenta?{" "}
            <span
              className="link"
              onClick={() => (window.location.href = "/login")}
            >
              Iniciar sesión
            </span>
          </p>

          <div className="divider">O regístrate con</div>

          <div className="socials">
            <FaFacebook className="social-icon facebook" />
            <FaSquareXTwitter className="social-icon twitter" />
            <FcGoogle
              className="social-icon google"
              onClick={() =>
                (window.location.href = "http://localhost:3000/auth/google")
              }
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
