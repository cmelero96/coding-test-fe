import React, { useCallback, useState } from "react";

import filterBy from "../api/filterBy";
import useApi from "../api/useApi";
import { ENDPOINTS } from "../constants/api";

import MatchFilter from "./MatchFilter";
import MatchTable from "./MatchTable";

const App = () => {
  const { data, loading, error } = useApi(ENDPOINTS.series, { method: 'GET' });
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = useCallback((field, textFilter) => {
    setFilteredData(field && textFilter
      ? data.filter((match) => filterBy[field](match, textFilter))
      : data)
  }, [data]);


  let appContent;
  if (error) {
    appContent = <div data-testid="error-msg">Error: {error.message}</div>
  }
  else if (loading) {
    appContent =  <div data-testid="loading-msg">Loading data...</div>;
  }
  else {
    appContent =
      <>
        {<MatchFilter onFilter={handleFilter}></MatchFilter>}
        <div style={{display: 'block', margin: '4px'}}/>
        {<MatchTable tournaments={filteredData}></MatchTable>}
      </>
  }
  
  return (
    <div data-testid="app-wrapper">
      {appContent}
    </div>
  );
};

export default App;