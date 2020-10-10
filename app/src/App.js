import React, { useState, useEffect } from "react";
import { MenuItem, FormControl, Select } from "@material-ui/core";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((res) => {
        res.json().then((data) => {});
      });
    };
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <div className="app__header">
        {/* Title ++ Dropdown selector */}
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* Loop through all the countries and show dropdown of all countries  */}
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Infobox */}
      {/* Infobox */}
      {/* Infobox */}

      {/* Table */}
      {/* Graph */}

      {/* Map */}
    </div>
  );
}

export default App;
