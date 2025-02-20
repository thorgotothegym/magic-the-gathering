import { Router } from "wouter";
import { Routes } from "./router/routes";

export const App = () => {
  return (
    <Router>
      <Routes />
    </Router>
  );
};
