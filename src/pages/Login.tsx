import React, { useState } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPasswordValue] = useState("");

  const handleLogin = async () => {
    try {
      const response: any = await login(email, password);

      // 🔥 TU BACKEND ENVÍA DIRECTAMENTE:
      // { accessToken, user }
      const user = response?.user ?? null;

      if (!user) {
        alert("Error inesperado: El backend no devolvió información del usuario.");
        return;
      }

      // 🟦 Usuario SIN contraseña (cuenta Google que no creó clave todavía)
      if (!user.password) {
        alert("Esta cuenta fue creada con Google. Debes crear una contraseña.");
        window.location.href = "/password";
        return;
      }

      // 🟩 Usuario sin rol (primera vez)
      if (!user.role) {
        window.location.href = "/selectrole";
        return;
      }

      // 🟪 Usuario cuidador
      if (user.role === "CUIDADOR") {
        window.location.href = "/care";
        return;
      }

      // 🟧 Usuario paciente
      if (user.role === "PACIENTE") {
        window.location.href = "/patient";
        return;
      }

    } catch (error: any) {
      const msg = error?.response?.data?.message ?? "";

      // Caso especial → cuenta social sin contraseña
      if (msg.includes("Debes crear una contraseña")) {
        alert("Tu cuenta fue creada con Google/Facebook. Debes crear una contraseña.");
        window.location.href = "/password";
        return;
      }

      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-page">

        {/* Formas decorativas */}
        <div className="top-shape"></div>
        <div className="bottom-shape"></div>

        <div className="login-container">
          <h1 className="title">Hola</h1>
          <p className="subtitle">Inicia sesión en tu cuenta</p>

          {/* INPUT EMAIL */}
          <IonInput
            className="input"
            type="email"
            placeholder="Correo"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value || "")}
          />

          {/* INPUT PASSWORD */}
          <IonInput
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onIonChange={(e) => setPasswordValue(e.detail.value || "")}
          />

          {/* LINK OLVIDAR CONTRASEÑA */}
          <a href="/forgot" className="forgot">¿Olvidaste tu contraseña?</a>

          {/* BOTÓN INICIAR SESIÓN */}
          <IonButton expand="block" className="signin-btn" onClick={handleLogin}>
            Iniciar sesión
          </IonButton>

          {/* CREAR CUENTA */}
          <p className="create">
            ¿No tienes una cuenta? <a href="/register">Crear</a>
          </p>

          {/* ICONOS REDES SOCIALES */}
          <div className="socials">
            <FaFacebook
              className="social-icon facebook"
              onClick={() => (window.location.href = "http://localhost:3000/auth/facebook")}
            />

            <FaSquareXTwitter
              className="social-icon twitter"
              onClick={() => (window.location.href = "http://localhost:3000/auth/x")}
            />

            <FcGoogle
              className="social-icon google"
              onClick={() => (window.location.href = "http://localhost:3000/auth/google")}
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
