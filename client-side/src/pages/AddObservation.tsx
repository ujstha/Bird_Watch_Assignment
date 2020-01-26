import React, { useState } from "react";
import {
  IonHeader,
  IonToolbar,
  IonPage,
  IonTitle,
  IonContent,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonMenuButton,
  IonIcon,
  IonLoading
} from "@ionic/react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { cloudUpload, save, close } from "ionicons/icons";

const AddObservation: React.FC = () => {
  //creating state using hook
  const [speciesName, setSpeciesName] = useState("");
  const [rarity, setRarity] = useState("");
  const [notes, setNotes] = useState("");
  const [speciesImage, setSpeciesImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageType, setImageType] = useState("");
  const [base64, setBase64] = useState(Object);
  const [responseColor, setResponseColor] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: any) => {
    let file = e.target.files[0];
    setSpeciesImage(file);
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file); //converting file to base64encode
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      setImageName(file.name);
      setImageType(file.type);
      setResponse("");
    }
  };

  const AddObservation = (e: any) => {
    e.preventDefault(); //preventing default method on button click
    setIsLoading(true); //shows loader on save button click

    const formData = new FormData(); //creating new form data and append data.
    formData.append("speciesImage", speciesImage);
    formData.append("speciesName", speciesName);
    formData.append("rarity", rarity);
    formData.append("notes", notes);

    //axios POST method
    axios
      .post("/birdwatchobservation", formData)
      .then(res => {
        if (res.data === "Error : Uploading Data was not found.") {
          setIsLoading(false); //hiding loader on response.
          setResponseColor("danger");
          setResponse(res.data);
        } else {
          setIsLoading(false);
          setResponse(`${res.data.msg}.`);
          setResponseColor("success");
          document.location.href = "/home";
        }
      })
      .catch(err => {
        if (err.response.status !== 400) {
          setResponseColor("danger");
          setResponse(err.response.data);
          setIsLoading(false);
        }
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Add Observation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <div className="row d-flex justify-content-center">
            <div className="col-md-4">
              <IonCard className="welcome-card">
                <IonCardHeader>
                  <IonCardTitle className="text-center text-uppercase">
                    Add New Observation
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  {response && (
                    <div
                      className={`alert alert-${responseColor} rounded-0 text-center`}
                    >
                      {response}
                    </div>
                  )}
                  <IonLoading
                    isOpen={isLoading}
                    onDidDismiss={() => setIsLoading(false)}
                    message={"Saving Data...."}
                    duration={5000}
                  />
                  <form
                    encType="multipart/form-data"
                    className="MuiPaper-root"
                    onSubmit={e => AddObservation(e)}
                  >
                    <input
                      type="text"
                      className="form-control mt-2 rounded-0"
                      placeholder="Write species name *"
                      onChange={e => setSpeciesName(e.target.value)}
                      onBlur={() =>
                        speciesName === ""
                          ? setError("speciesName")
                          : setError("")
                      }
                    />
                    <span className="text-danger">
                      {speciesName === "" &&
                        error === "speciesName" &&
                        "Species Name is Required."}
                    </span>

                    <select
                      className="form-control mt-2 rounded-0"
                      placeholder="Select Rarity *"
                      onChange={e => setRarity(e.target.value)}
                      value={rarity}
                      onBlur={() =>
                        rarity === "" ? setError("rarity") : setError("")
                      }
                    >
                      <option value="">Select Rarity</option>
                      <option value="common">Common</option>
                      <option value="rare">Rare</option>
                      <option value="extremely rare">Extremely Rare</option>
                    </select>
                    <span className="text-danger">
                      {rarity === "" &&
                        error === "rarity" &&
                        "Rarity is Required."}
                    </span>

                    <input
                      type="text"
                      className="form-control mt-2 rounded-0"
                      placeholder="Write notes *"
                      onChange={e => setNotes(e.target.value)}
                      onBlur={() =>
                        notes === "" ? setError("notes") : setError("")
                      }
                    />
                    <span className="text-danger">
                      {notes === "" &&
                        error === "notes" &&
                        "Notes is Required."}
                    </span>

                    <label
                      htmlFor="file-upload"
                      className="file-upload-button mt-2 mb-0"
                    >
                      <div className="file-name">
                        <IonIcon icon={cloudUpload} />{" "}
                        {imageName ? imageName : "Upload an Image...."}
                      </div>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      className="rounded-0"
                      accept="image/*"
                      onChange={e => handleImageChange(e)}
                    />
                    <div>
                      <span>
                        Note: .jpg and .jpeg formats are only allowed.
                      </span>
                    </div>
                    {speciesImage &&
                      imageType !== "" &&
                      imageType !== "image/jpeg" &&
                      imageType !== "image/jpg" && (
                        <div>
                          <span className="text-danger">
                            Please upload image with .jpg or .jpeg format.
                          </span>
                        </div>
                      )}

                    {imageName && (
                      <img
                        src={base64}
                        alt={imageName}
                        style={{
                          height: 200,
                          maxHeight: 200,
                          width: "100%",
                          objectFit: "cover"
                        }}
                        className="mt-2"
                      />
                    )}

                    <Button
                      type="reset"
                      className="mt-3 rounded-0 MuiButton-contained MuiButton-containedSecondary reset-btn"
                      style={{
                        marginRight: 16
                      }}
                      onClick={() => {
                        setError("");
                        setResponse("");
                        setBase64(Object);
                        setImageName("");
                        setImageType("");
                      }}
                    >
                      <IonIcon icon={close} /> &nbsp; Reset
                    </Button>

                    <Button
                      type="submit"
                      className="mt-3 rounded-0 MuiButton-contained MuiButton-containedPrimary save-btn"
                      disabled={
                        speciesName === "" ||
                        rarity === "" ||
                        notes === "" ||
                        imageName === "" ||
                        (imageType !== "image/jpeg" &&
                          imageType !== "image/jpg")
                          ? true
                          : false
                      }
                    >
                      <IonIcon icon={save} /> &nbsp; Save
                    </Button>
                  </form>
                </IonCardContent>
              </IonCard>
            </div>
          </div>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddObservation;
