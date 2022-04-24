// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom";
import './index.css'

import useApi from "./hooks/useApi";

import GameTable from "./components/GameTable";
import { ENDPOINTS } from "./constants/server";

export const App = () => {
  const { data, loading, error } = useApi(ENDPOINTS.series, { method: 'GET' });

  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {<GameTable tournaments={data}></GameTable>}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
