import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SelectRole from "./pages/SelectRole";
import Password from "./pages/password";
import SocialSuccess from "./pages/SocialSuccess";

import CareTabs from "./pages/care/CareTabs";
import PatientTabs from "./pages/patient/PatientTabs";

import { AuthProvider } from "./context/AuthContext";

import "./theme/variables.css";
import CareMedicines from "./pages/care/CareMedicines";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <IonRouterOutlet>

            {/* PANTALLAS PÚBLICAS */}
            <Route exact path="/splash">
              <Splash />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/register">
              <Register />
            </Route>

            <Route exact path="/forgot">
              <ForgotPassword />
            </Route>

            <Route exact path="/reset-password/:token">
              <ResetPassword />
            </Route>

            <Route exact path="/selectrole">
              <SelectRole />
            </Route>

            <Route exact path="/social-success">
              <SocialSuccess />
            </Route>

            {/* 🔥 NUEVA RUTA PARA CREAR CONTRASEÑA */}
            <Route exact path="/password">
              <Password />
            </Route>

            <Route exact path="/care/medicines/:patientId">
              <CareMedicines />
            </Route>

            {/* PANTALLAS PRIVADAS */}
            <Route path="/care">
              <CareTabs />
            </Route>


            <Route path="/patient">
              <PatientTabs />
            </Route>

            {/* REDIRECCIÓN POR DEFECTO */}
            <Route exact path="/">
              <Redirect to="/splash" />
            </Route>

          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
