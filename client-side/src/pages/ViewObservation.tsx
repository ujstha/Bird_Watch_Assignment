import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonProgressBar,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonModal,
  IonButton,
  IonChip,
  IonLabel
} from "@ionic/react";
import axios from "axios";
import moment from "moment";
import { close, doneAll } from "ionicons/icons";
import { RefresherEventDetail } from "@ionic/core";

const ViewObservation: React.FC = () => {
  const [observations, setObservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortMsg, setSortMsg] = useState("");
  const [map, setMap] = useState(false);
  const [info, setInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState("");
  const [detailID, setDetailID] = useState("");

  const GetData = () => {
    axios
      .get("/birdwatchobservation")
      .then(res => {
        setTimeout(function() {
          setIsLoading(false);
        }, 2000);
        setObservations(res.data);
      })
      .catch(err => console.log(err.response));
  };

  function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    GetData(); //calling axios get function to get new data if there's any
    setSortMsg("");

    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  }

  React.useEffect(() => {
    GetData();
  }, []);

  let sortedObservation;

  function sortByCreateDate() {
    sortedObservation = observations.sort((itemA, itemB) =>
      Date.parse(itemA["createdDate"]) < Date.parse(itemB["createdDate"])
        ? 1
        : -1
    );
    setObservations(sortedObservation);
    setSortMsg("Latest Upload Date at first.");
  }

  function sortBySpeciesName() {
    sortedObservation = observations.sort((itemA, itemB) =>
      itemA["speciesName"] > itemB["speciesName"] ? 1 : -1
    );
    setObservations(sortedObservation);
    setSortMsg("Sorted Alphabetically (A - Z).");
  }

  return (
    <IonPage className="ion__home-container" id="main">
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <img
          src={img}
          alt="fullScreen-images"
          style={{
            height: "calc(100% - 50px)",
            width: "100%",
            objectFit: "contain"
          }}
        />
        <IonButton onClick={() => setShowModal(false)}>
          <IonIcon icon={close} />
        </IonButton>
      </IonModal>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {isLoading && <IonProgressBar type="indeterminate" />}
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {!isLoading && observations.length !== 0 && (
          <div className="mt-3 text-center">
            <IonChip onClick={sortByCreateDate}>
              {sortMsg === "Latest Upload Date at first." && (
                <IonIcon icon={doneAll} />
              )}
              <IonLabel>Sort by Timestamp</IonLabel>
            </IonChip>
            <IonChip onClick={sortBySpeciesName}>
              {sortMsg === "Sorted Alphabetically (A - Z)." && (
                <IonIcon icon={doneAll} />
              )}
              <IonLabel>Sort Alphabetically</IonLabel>
            </IonChip>
          </div>
        )}
        <div className="text-info text-center mt-2">{sortMsg}</div>
        {observations.length === 0 && !isLoading ? (
          <IonList className="text-center p-2 mt-5">
            <h2>
              Oops.... Data was not found.
              <br /> Try Refreshing the page.
            </h2>
          </IonList>
        ) : (
          !isLoading && (
            <div className="row">
              {observations.map((observation, index) => {
                return (
                  <div
                    key={index}
                    className={`mt-4 col-md-4 ${
                      index + 1 === observations.length ? "mb-2" : ""
                    }`}
                  >
                    <IonCard className="ion-no-margin">
                      <div className="species-data-container">
                        <img
                          src={observation["speciesImage"]}
                          alt={observation["speciesName"]}
                          className="species-image"
                        />
                        <IonModal
                          isOpen={
                            map && observation["_id"] === detailID
                              ? true
                              : false
                          }
                          onDidDismiss={() => setMap(false)}
                        >
                          <iframe
                            title={observation["speciesName"]}
                            src={`https://maps.google.com/maps?q=${observation["geoLatitude"]}, ${observation["geoLongitude"]}&z=10&output=embed`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allowFullScreen
                          ></iframe>
                          <IonButton onClick={() => setMap(false)}>
                            <IonIcon icon={close} />
                          </IonButton>
                        </IonModal>
                        <IonModal
                          isOpen={
                            info && observation["_id"] === detailID
                              ? true
                              : false
                          }
                          onDidDismiss={() => setInfo(false)}
                        >
                          <div className="mx-2 detail-modal">
                            <h3 className="text-center my-3 font-weight-bolder">
                              Details about the species
                            </h3>
                            <p>
                              <b>Name : </b> {observation["speciesName"]}
                            </p>
                            <p>
                              <b>Rarity : </b> {observation["rarity"]}
                            </p>
                            <p>
                              <b>Notes : </b> {observation["notes"]}
                            </p>
                            {observation["timestamp"] && (
                              <p>
                                <b>Datetime Original : </b>
                                {moment
                                  .unix(observation["timestamp"])
                                  .format("Do MMM, YYYY HH:MM A")}
                                {/* timestamp is saved as number in db so need UNIX to get exact datetime */}
                              </p>
                            )}
                            <p>
                              <b>Created Date : </b>
                              {moment(observation["createdDate"]).format(
                                "Do MMM, YYYY HH:MM A"
                              )}
                            </p>
                          </div>
                          <IonButton onClick={() => setInfo(false)}>
                            <IonIcon icon={close} />
                          </IonButton>
                        </IonModal>
                      </div>
                      <IonCardHeader className="ion-no-padding ion-no-margin py-2 px-3">
                        <div className="clearfix">
                          <span className="float-left species-name">
                            {observation["speciesName"]}
                          </span>
                        </div>
                        <div
                          style={{ letterSpacing: 0.7 }}
                          className="clearfix"
                        >
                          <small className="d-inline-block float-left">
                            {observation["rarity"]}
                          </small>
                          <span className="map-info-icon float-right">
                            {observation["geoLatitude"] &&
                              observation["geoLongitude"] && (
                                <i
                                  className="fa fa-map-marked-alt text-primary"
                                  onClick={() => {
                                    setDetailID(observation["_id"]);
                                    setMap(!map);
                                  }}
                                ></i>
                              )}{" "}
                            &nbsp; &nbsp;
                            <i
                              className="fa fa-info-circle text-primary"
                              onClick={() => {
                                setDetailID(observation["_id"]);
                                setInfo(!info);
                              }}
                            ></i>{" "}
                            &nbsp; &nbsp;
                            <i
                              className="fa fa-expand text-primary"
                              onClick={() => {
                                setImg(`${observation["speciesImage"]}`);
                                setShowModal(true);
                              }}
                            ></i>
                          </span>
                        </div>
                      </IonCardHeader>
                    </IonCard>
                  </div>
                );
              })}
            </div>
          )
        )}
      </IonContent>
    </IonPage>
  );
};

export default ViewObservation;
