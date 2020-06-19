import "./App.css";

import React from "react";
import { DeploymentForm } from "./components/DeploymentForm";
import { DeploymentsTable } from "./components/DeploymentsTable";

export function App() {
  return (
    <>
      <DeploymentForm />
      <DeploymentsTable />
    </>
  );
}
