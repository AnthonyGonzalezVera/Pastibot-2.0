import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import "./ForgotPassword.css";

const ForgotPassword: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="forgot-page">
        {/* Fondo decorativo */}
        <div className="top-shape"></div>
        <div className="bottom-shape"></div>

        {/* Contenedor principal */}
        <div className="forgot-container">
          <h1 className="title">Forgot Password</h1>
          <p className="subtitle">
            Enter your email and we’ll send you a link to reset your password.
          </p>

          <form className="forgot-form">
            <input type="email" placeholder="Email" />
            <button
              type="button"
              className="forgot-btn"
              onClick={() => (window.location.href = "/login")}
            >
              SEND RESET LINK
            </button>
          </form>

          <p className="back-login" onClick={() => (window.location.href = "/login")}>
            ← Back to Login
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
