import React from "react";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import {
  homeOutline,
  medkitOutline,
  settingsOutline,
  peopleOutline,
  personCircleOutline,
} from "ionicons/icons";

import CareHome from "./CareHome";
import CareMedicines from "./CareMedicines";
import CareControl from "./CareControl";
import CarePatients from "./CarePatients";
import CareProfile from "./CareProfile";

import "./CareTabs.css";

const CareTabs: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/care/home" component={CareHome} />
        <Route exact path="/care/medicines" component={CareMedicines} />
        <Route exact path="/care/control" component={CareControl} />
        <Route exact path="/care/patients" component={CarePatients} />
        <Route exact path="/care/profile" component={CareProfile} />
        <Route exact path="/care">
          <Redirect to="/care/home" />
        </Route>
      </IonRouterOutlet>

      {/* Barra inferior con botón central elevado */}
      <IonTabBar slot="bottom" className="care-tabbar">
        <IonTabButton tab="home" href="/care/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>

        <IonTabButton tab="medicines" href="/care/medicines">
          <IonIcon icon={medkitOutline} />
          <IonLabel>Medicinas</IonLabel>
        </IonTabButton>

        {/* Botón central importante */}
        <IonTabButton tab="control" href="/care/control" className="tab-control">
          <IonIcon icon={settingsOutline} />
          <IonLabel>Control</IonLabel>
        </IonTabButton>

        <IonTabButton tab="patients" href="/care/patients">
          <IonIcon icon={peopleOutline} />
          <IonLabel>Pacientes</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile" href="/care/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default CareTabs;
