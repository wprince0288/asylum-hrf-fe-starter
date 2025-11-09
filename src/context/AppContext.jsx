import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

/**
 * TODO: Ticket 2:
 * - Use axios to fetch the data
 * - Store the data
 * - Populate the graphs with the stored data
 */
const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);

  useLocalStorage({ graphData, setGraphData });

  const BASE_URL = 'https://asylum-be.onrender.com';

  const getFiscalData = async () => {
    // TODO: Replace this with functionality to retrieve the data from the fiscalSummary endpoint
    try {
      const response = await axios.get(`${BASE_URL}/fiscalSummary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching fiscal data:', error);
      setError(error);
      return null;
    }
  };

  const getCitizenshipResults = async () => {
    // TODO: Replace this with functionality to retrieve the data from the citizenshipSummary endpoint
    try {
      const response = await axios.get(`${BASE_URL}/citizenshipSummary`);
      return response.data;
    } catch (error) {
      console.error('Error fetching citizenship data:', error);
      setError(error);
      return null;
    }
  };

  const fetchData = async () => {
    // TODO: fetch all the required data and set it to the graphData state
    setIsDataLoading(true);
    try {
      const [fiscalData, citizenshipData] = await Promise.all([
        getFiscalData(),
        getCitizenshipResults(),
      ]);
      if (fiscalData && citizenshipData) {
        const normalizedData = {
          yearResults: fiscalData.yearResults || fiscalData.data || [],
          citizenshipResults: citizenshipData.citizenshipResults || citizenshipData.data || [],
        };
        setGraphData(normalizedData);
      } else {
        console.warn('Some data could not be loaded.');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err);
    } finally {
      setIsDataLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const updateQuery = () => fetchData();
  const clearQuery = () => setGraphData({});
  const getYears = () =>
    graphData?.yearResults?.map(({ fiscal_year }) => Number(fiscal_year)) ?? [];

  return {
    graphData,
    setGraphData,
    isDataLoading,
    error,
    updateQuery,
    clearQuery,
    getYears,
  };
};

export function useAppContext() {
  return useContext(AppContext);
}

export function ProvideAppContext({ children }) {
  const contextValue = useAppContextProvider();

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
}
