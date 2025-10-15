import React from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="login-page">
        {/* Fondo decorativo */}
        <div className="top-shape"></div>
        <div className="bottom-shape"></div>

        {/* Contenido centrado */}
        <div className="login-container">
          <h1 className="title">Hello</h1>
          <p className="subtitle">Sign in to your account</p>

          {/* Campos de entrada */}
          <IonInput className="input" placeholder="Username" />
          <IonInput className="input" type="password" placeholder="Password" />

          <a href="#" className="forgot">Forgot your password?</a>

          {/* Botón principal */}
          <IonButton expand="block" className="signin-btn">
            Sign In
          </IonButton>

          <p className="create">
            Don’t have an account? <a href="#">Create</a>
          </p>

          {/* Iconos sociales */}
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

export default Login;
