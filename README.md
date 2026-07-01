# ShopEasy

A cross-platform e-commerce mobile application built with React Native (Expo). The app provides authentication, product browsing, shopping cart management, checkout, order history, offline storage, and device integrations.

## Tech Stack

### Frontend

* React Native (Expo)
* React Navigation
* Redux Toolkit
* React Redux
* Axios
* Formik
* Yup
* AsyncStorage

### Backend

* JSON Server

### Device Features

* Expo Image Picker
* Expo Camera (QR Scanner)
* Expo Location
* React Native Maps

## Project Structure

```text
ShopEasy/
│
├── assets/
├── backend/
│   ├── db.json
│   ├── package.json
│   └── package-lock.json
│
├── src/
├── App.js
├── package.json
└── README.md
```

## Installation

Clone the repository:

```bash
git clone <repository-url>
cd ShopEasy
```

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
cd ..
```

## Running the Project

Start the Expo application:

```bash
npx expo start
```

Start the JSON Server (in a separate terminal):

```bash
cd backend
npm run server
```