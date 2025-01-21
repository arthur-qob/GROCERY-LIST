import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App.js';
import Items from './Pages/Items.js';
import Profile from './Pages/Profile.js';
import Contact from './Pages/Contact.js';
import LogIn from './Pages/LogIn.js';
import SignIn from './Pages/SignIn.js';
import './Styles/index.css';

/*
  Importing React Router
*/

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// import reportWebVitals from './reportWebVitals';

/*
  React Bootstrap Configuration
*/

import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

<script src = "https://kit.fontawesome.com/5fe1b6438c.js" crossorigin = "anonymous"></script>

/*
  React Router Configuration
*/

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/items',
    element: <Items/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/contact',
    element: <Contact/>
  },
  {
    path: '/login',
    element: <LogIn/>
  },
  {
    path: '/signin',
    element: <SignIn/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router = {router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();