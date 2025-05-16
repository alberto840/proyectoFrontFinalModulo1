import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./components/login/loginView";
import RegisterView from "./components/register/registerView";
import RegisterTaskView from "./components/registerTask/registerTask";
import Home from "./components/home/homeView";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import ErrorPage from "./components/error/ErrorPage";
import Layout from "./components/layout/Layout";
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "/tareas",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "crear",
        element: <RegisterTaskView />
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
