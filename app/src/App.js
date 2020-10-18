import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import { sortData, prettyPrintStat, prettyPrintComm } from "./util";

import Infobox from "./Infobox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";

import "./App.css";
import "./Table.css";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

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

          const sortedData = sortData(data);

          setTableData(sortedData);
          setCountries(countriesArr);
          setMapCountries(data);
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
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
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
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            total={prettyPrintComm(countryInfo.cases)}
            cases={prettyPrintStat(countryInfo.todayCases)}
          ></Infobox>
          <Infobox
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            total={prettyPrintComm(countryInfo.recovered)}
            cases={prettyPrintStat(countryInfo.todayRecovered)}
          ></Infobox>
          <Infobox
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={prettyPrintComm(countryInfo.deaths)}
            cases={prettyPrintStat(countryInfo.todayDeaths)}
          ></Infobox>
        </div>

        <Map
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} casesType={casesType} />
          <h3>Worldwide new cases</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
