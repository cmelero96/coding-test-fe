import {useEffect, useState} from 'react';
import useWebSocket from 'react-use-websocket';
import {PROTOCOLS, BASE_URL, ENDPOINTS} from '../constants/server';

/**
 * Get a WebSocket client by providing an endpoint. The data returned is already mapped.
 * @param {*} endpoint
 * @returns
 */
const useWsClient = (endpoint) => {
  const {lastMessage} = useWebSocket(getUrl(endpoint));
  const [parsedMessage, setParsedMessage] = useState([]);

  useEffect(() => {
    const mappingFn = getMappingFn(endpoint);

    if (lastMessage && lastMessage.data && mappingFn) {
      const parsedMsg = mappingFn(lastMessage);
      setParsedMessage(parsedMsg);
    }
  }, [lastMessage, endpoint]);

  return {newMessage: parsedMessage};
};

export default useWsClient;

/**
 * Get the full URL for the WebSocket client.
 * @param {*} endpoint
 * @returns
 */
const getUrl = (endpoint) => `${PROTOCOLS.ws}://${BASE_URL}/${endpoint}`;

/**
 * Get the mapping function for the data returned by the WebSocket client for the desired endpoint.
 * @param {*} endpoint
 * @returns
 */
const getMappingFn = (endpoint) => {
  if (endpoint === ENDPOINTS.series) {
    /*
      Return the match/tournament id, the most recent game result and the total series score.
      If only one game is available, don't return any series score.
      If no game data are available at all, return only the id.
    */
    return (d) =>
      JSON.parse(d.data).map((match) => {
        const result = {id: match.id};
        const lastGame = match.games[match.games.length - 1];

        if (!lastGame) return result;

        result.score = [lastGame.teams[0].score, lastGame.teams[1].score];

        if (match.games.length === 1) return result;

        result.series = [match.series.teams[0].score, match.series.teams[1].score];
        return result;
      });
  }
  // If more mapping functions are needed for other endpoints in the future, they should be defined here.

  throw new Error('No mapping function found for endpoint: ' + endpoint);
};
