import React from "react";
import { IonPage, IonContent } from "@ionic/react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
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
          <h1 className="title">Create Account</h1>
          <p className="subtitle">Sign up to start using Pastibot</p>

          <form className="register-form">
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button
              type="button"
              className="register-btn"
              onClick={() => (window.location.href = "/selectrole")}
            >
              CREATE ACCOUNT
            </button>
          </form>

          <p className="signin-text">
            Already have an account?{" "}
            <span
              className="link"
              onClick={() => (window.location.href = "/login")}
            >
              Sign in
            </span>
          </p>

          <div className="divider">Or sign up with</div>

          <div className="social-icons">
            <FaFacebook className="icon facebook" />
            <FcGoogle className="icon google" />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
