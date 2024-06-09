import React, { useContext, useEffect, useState } from "react";

const API_URL = 'http://www.omdbapi.com/?apikey=675de4e0&s=titanic';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [isError, setIsError] = useState({ show: false, msg: "" });

  const getMovies = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.Response === "True") {
        setIsLoading(false);
        setMovie(data.Search);  // Ensure the correct key is used ('Search' instead of 'search')
      } else {
        setIsLoading(false);
        setIsError({ show: true, msg: data.Error });  // Ensure the correct key is used ('Error' instead of 'error')
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setIsError({ show: true, msg: "Something went wrong!" });
    }
  };

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  return (
    <AppContext.Provider value={{ isLoading, isError, movie }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
