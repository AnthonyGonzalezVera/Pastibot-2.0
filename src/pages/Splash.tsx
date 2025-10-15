import React, { useEffect } from "react";
import { IonPage, IonContent } from "@ionic/react";
import "./Splash.css";

const Splash: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "/login";
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen className="splash-screen">
        <img src="/logo3d.png" alt="Pastibot Logo" className="logo" />
      </IonContent>
    </IonPage>
  );
};

export default Splash;
