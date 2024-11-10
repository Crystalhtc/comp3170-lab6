import React, { useState, useEffect } from 'react';
import './App.css';
import Countries from './components/Countries/Countries';
import Filter from './components/Filter/Filter';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [fetchStatus, setFetchStatus] = useState("idle");
  const [filters, setFilters] = useState({
    continent: "all",
    subregion: "all",
    sortAlpha: false,
    topTen: {
      population: false,
      area: false
    }
  });

  const isLoading = fetchStatus === "loading";
  const isError = fetchStatus === "error";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchStatus("loading");
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        console.log(data);
        setCountries(data);
        setFilteredCountries(data);
        setFetchStatus("idle");
      } catch (error) {
        console.error('Error fetching countries:', error);
        setFetchStatus("error");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = [...countries];

    if (filters.continent !== "all") {
      result = result.filter(country => 
        country.continents.some(c => c.toLowerCase() === filters.continent.toLowerCase())
      );
    }

    if (filters.subregion !== "all") {
      result = result.filter(country => 
        country.subregion?.toLowerCase() === filters.subregion.toLowerCase()
      );
    }

    if (filters.sortAlpha) {
      result = result.sort((a, b) => 
        a.name.common.localeCompare(b.name.common)
      );
    }

    if (filters.topTen.population) {
      result = [...result].sort((a, b) => b.population - a.population).slice(0, 10);
    } else if (filters.topTen.area) {
      result = [...result].sort((a, b) => b.area - a.area).slice(0, 10);
    }

    setFilteredCountries(result);
  }, [countries, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === "continent") {
        newFilters.continent = value;
        newFilters.subregion = "all"; 
      } else if (filterType === "subregion") {
        newFilters.subregion = value;
        newFilters.continent = "all"; 
      } else if (filterType === "sortAlpha") {
        newFilters.sortAlpha = value;
      } else if (filterType === "topTenPopulation") {
        newFilters.topTen = {
          population: value,
          area: false
        };
      } else if (filterType === "topTenArea") {
        newFilters.topTen = {
          population: false,
          area: value
        };
      }
      
      return newFilters;
    });
  };

  const uniqueSubregions = [...new Set(countries
    .map(country => country.subregion)
    .filter(Boolean)
  )].sort();

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) return <div className="error">Error loading countries data</div>;

  return (
    <div className="app-container">
      <h1 className="app-title">Countries of the World</h1>
      
      <Filter
        filters={filters}
        onFilterChange={handleFilterChange}
        uniqueSubregions={uniqueSubregions}
      />

      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;