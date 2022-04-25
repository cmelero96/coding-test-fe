// @ts-nocheck

import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";
import './index.css'

import filterBy from "./api/filterBy";
import useApi from "./api/useApi";
import { ENDPOINTS } from "./constants/api";

import MatchFilter from "./components/MatchFilter";
import MatchTable from "./components/MatchTable";

export const App = () => {
  const { data, loading, error } = useApi(ENDPOINTS.series, { method: 'GET' });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = useCallback((field, textFilter) => {
    setFilteredData(field && textFilter
      ? data.filter((match) => filterBy[field](match, textFilter))
      : data)
  }, [data]);

  if (error) {
    return <div data-testid="error-msg">Error: {error.message}</div>
  }
  if (loading) {
    return <div data-testid="loading-msg">Loading data...</div>;
  }
  
  return (
    <div data-testid="app-wrapper">
      {<MatchFilter onFilter={handleFilter}></MatchFilter>}
      <div style={{display: 'block', margin: '4px'}}/>
      {<MatchTable tournaments={filteredData}></MatchTable>}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
