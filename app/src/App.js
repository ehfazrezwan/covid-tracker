import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then((response) =>
      response.json().then((data) => {
        setCountryInfo(data);
      })
    );
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries").then((res) => {
        res.json().then((data) => {
          const countriesArr = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setTableData(data);
          setCountries(countriesArr);
        });
      });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url).then((response) =>
      response.json().then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      })
    );
  };

  return (
    <div className="app">
      {/* Header */}
      <div className="app__left">
        <div className="app__header">
          {/* Title ++ Dropdown selector */}
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide" key="worldwide">
                Worldwide
              </MenuItem>
              {/* Loop through all the countries and show dropdown of all countries  */}
              {countries.map((country) => (
                <MenuItem value={country.value} key={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox
            title="Coronavirus Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          ></Infobox>
          <Infobox
            title="Recovered"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          ></Infobox>
          <Infobox
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          ></Infobox>
        </div>

        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* Table */}
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
