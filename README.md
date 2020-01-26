## About The Project
This project is assigned to create an application in which a person can share an image of a bird or an animal along with information like rarity of an animal, image captured date, GPS location of an image and date of image upload.

## Built Using
This is a hybrid application built using Ionic-React Framework along with following stacks:

- [Ionic-react](https://ionicframework.com/docs/react)
- [Capacitor](https://capacitor.ionicframework.com)
- [Node](https://nodejs.org/en)
- [mLab](https://mlab.com)
- [Express](https://expressjs.com)

[Material-UI](https://material-ui.com), [moment.js](https://momentjs.com/) and [axios](https://github.com/axios/axios) were also used to built this application.

## Prerequisites
Make sure you have installed all of the following prerequisites on your computer:

- Node.js - [Download and Install Node.js](https://nodejs.org/en/) and the [npm package manager](https://www.npmjs.com/get-npm).
- mLab - We're going to use [mLab](https://www.mlab.com/) to store data. Make sure you've credentials for [mLab](https://www.mlab.com/).
- Cloudinary - We're going to use [cloudinary](https://cloudinary.com/) to store image file. Make sure you've credentials for [cloudinary](https://cloudinary.com/) to get an API.

## App Installation

#### Server-side Installation

1. Register and get a free API Key at [Cloudinary](https://cloudinary.com/).
2. Create a remote storage in mLab from [here](https://mlab.com/create/wizard#PlanType-Provider).
3. Clone the repository.

Write below command in command line to clone the repository.

```sh
git clone https://github.com/ujstha/Bird_Watch_Assignment.git
```

4. After cloning the repository, create .env file on server-side directory and provide following credentials: 

```sh
- MONGODB_URI=YOUR_MLAB_DB_URI
- CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY=YOUR_CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_API_SECRET
```
After providing credentials in `.env` file, close and save the file.

5. Now run the following command in server-side folder to install the packages that are in `package.json` file: 

```sh
npm install
```

6. Now run the following command in server-side folder to start the server.

```sh
npm start
```
Server will run on port 5000. <br />
The base URL for API for server will be [http://localhost:5000/api](http://localhost:5000/api). <br />
I have also deployed my server-side in heroku. The API is [https://birdwatchobservation.herokuapp.com/](https://birdwatchobservation.herokuapp.com/).

#### Client-side Installation

7. Run the following commands in client-side folder to install the packages that are in package.json file:

```sh
npm install
```

8. When the installation is completed, run the following command in client-side folder to start the client app.

```sh
ionic serve
```

#### Build and run `client-side` on android device or emulator
If you want to build and run the client side on your android device, run following command on client-side folder: <br />

```sh
ionic capacitor run android
```

#### Changes to make if server is running on `localhost`
If you wish to use ` localhost ` for server then, go to following directory and open App.tsx file.
### `client-side/src/App.tsx`

and, replace the code on `line 70` with following code. Save and run client-side.

```JS
axios.defaults.baseURL = "http://localhost:5000/api";
//axios.defaults.baseURL = "https://birdwatchobservation.herokuapp.com/api"; 
```
### The complete installation guide video. 

[Click here to watch](https://www.youtube.com/watch?v=OJYqJOw5PIs).

## App Demo Link `for web view`

[https://bird-watch-observations.netlify.com/](https://bird-watch-observations.netlify.com/)
##### Note: Press ` F12 ` to view in mobile mode.


## License

Distributed under the MIT License. See `LICENSE` for more information.


