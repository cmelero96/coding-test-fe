import {useEffect, useState} from 'react';
import useAxios from 'axios-hooks';
import {PROTOCOLS, BASE_URL, ENDPOINTS} from '../constants/api';
import {extractTimeFromIso} from '../utils/datetime';

/**
 * Get the mapped API data by providing and endpoint. Includes loading & error states.
 * @param {*} endpoint
 * @returns
 */
const useApi = (endpoint, options) => {
  const [{data, loading, error}] = useAxios({
    url: getUrl(endpoint),
    ...options,
  });
  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const mappingFn = getMappingFn(endpoint);

    if (!loading && !error && mappingFn) {
      setParsedData(data.map(mappingFn));
    }
  }, [data, loading, error, endpoint]);

  return {data: parsedData, loading, error};
};

export default useApi;

/**
 * Get the full URL for the API call.
 * @param {*} endpoint
 * @returns
 */
const getUrl = (endpoint) => `${PROTOCOLS.api}://${BASE_URL}/${endpoint}`;

/**
 * Get the mapping function for the data returned by the API call for the desired endpoint.
 * @param {*} endpoint
 * @returns
 */
const getMappingFn = (endpoint) => {
  if (endpoint === ENDPOINTS.series) {
    return (d) => ({
      ...d,
      startTime: extractTimeFromIso(d.startTime),
    });
  }
  // If more mapping functions are needed for other endpoints in the future, they should be defined here.

  throw new Error('No mapping function found for endpoint: ' + endpoint);
};
