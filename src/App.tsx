import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* 🧭 Importamos las páginas principales */
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SelectRole from "./pages/SelectRole";

/* 🧭 Importamos los módulos de cada rol */
import CareTabs from "./pages/care/CareTabs";
import PatientTabs from "./pages/patient/PatientTabs";

import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* 1️⃣ Pantalla inicial → Splash */}
        <Route exact path="/splash" component={Splash} />

        {/* 2️⃣ Inicio de sesión */}
        <Route exact path="/login" component={Login} />

        {/* 3️⃣ Registro */}
        <Route exact path="/register" component={Register} />

        {/* 4️⃣ Recuperar contraseña */}
        <Route exact path="/forgot" component={ForgotPassword} />

        {/* 5️⃣ Selección de rol */}
        <Route exact path="/selectrole" component={SelectRole} />

        {/* 6️⃣ Cuidador */}
        <Route path="/care" component={CareTabs} />

        {/* 7️⃣ Paciente */}
        <Route path="/patient" component={PatientTabs} />

        {/* 🔁 Redirección raíz → Splash */}
        <Route exact path="/">
          <Redirect to="/splash" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
