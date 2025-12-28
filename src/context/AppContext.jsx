import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AppContext = createContext({});

const useAppContextProvider = () => {
  const [graphData, setGraphData] = useState({});
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [error, setError] = useState(null);

  useLocalStorage({ graphData, setGraphData });

  const BASE_URL = 'https://asylum-be.onrender.com';

  const getFiscalData = async () => {

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
