import React from "react";
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  setupConfig,
  IonLabel
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import axios from "axios";

import { AppPage } from "./declarations";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";

import Menu from "./components/Menu";
import { add, home } from "ionicons/icons";
import { ViewObservation, AddObservation } from "./pages/Tabs";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./assets/css/index.css";

const appPages: AppPage[] = [
  {
    title: "Home",
    url: "/home",
    icon: "fa fa-home"
  },
  {
    title: "Add Observation",
    url: "/add-observation",
    icon: "fa fa-plus"
  }
];

setupConfig({
  rippleEffect: true,
  mode: "md"
});

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Work Sans", "Raleway", "Montserrat", "sans-serif"].join(",")
  }
});

const App: React.FC = () => {
  //axios.defaults.baseURL = "http://localhost:5000/api";
  axios.defaults.baseURL = "https://birdwatchobservation.herokuapp.com/api";

  return (
    <MuiThemeProvider theme={theme}>
      <IonApp>
        <IonReactRouter>
          <Menu appPages={appPages} />
          <IonTabs>
            <IonRouterOutlet id="main">
              <Route
                path="/"
                render={() => <Redirect to="/home" />}
                exact={true}
              />
              <Route path="/home" component={ViewObservation} exact={true} />
              <Route
                path="/add-observation"
                component={AddObservation}
                exact={true}
              />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>HOME</IonLabel>
              </IonTabButton>
              <IonTabButton tab="add-observation" href="/add-observation">
                <IonIcon icon={add} />
                <IonLabel>ADD OBSERVATION</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </MuiThemeProvider>
  );
};

export default App;
