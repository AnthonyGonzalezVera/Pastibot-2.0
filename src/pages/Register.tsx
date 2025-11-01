import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaSquareXTwitter } from "react-icons/fa6";

import "./Register.css";

const Register: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="register-page">
        {/* Formas decorativas */}
        <div className="top-shape"></div>
        <div className="bottom-shape"></div>

        {/* Contenedor principal */}
        <div className="register-container">
          <h1 className="title">Crear una cuenta</h1>
          <p className="subtitle">Regístrate para empezar a usar Pastibot</p>

          <form className="register-form">
            <input type="text" placeholder="Nombre completo" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Constraseña" />
            <input type="password" placeholder="Confirmar contraseña" />
            <button
              type="button"
              className="register-btn"
              onClick={() => (window.location.href = "/selectrole")}
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
            <FcGoogle className="social-icon google" />
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
