import { Grid, GridItem } from "@chakra-ui/react";
import { useRef, useState } from "react";
import geodata from "../data/geodata";
import Achievements from "./achievements";
import CountryList from "./country-list";
import WorldMap from "./world-map";

const STORAGE_KEY = "countries";

const nameCompare = (a, b) => a.name.localeCompare(b.name);

export default function Content() {
  const worldMapRef = useRef(null);

  const [countries, setCountries] = useState(
    new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)))
  );

  const toggleCountry = (id) =>
    setCountries((countries) => {
      countries.delete(id) || countries.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...countries]));
      return new Set(countries);
    });

  const toggleMapCountry = (id) => worldMapRef.current?.toggle(id);

  const [
    unvisitedCountriesData,
    visitedCountriesData,
  ] = geodata.features.reduce(
    (acc, { id, properties }) =>
      acc[+countries.has(id)].push(properties) && acc,
    [[], []]
  );

  unvisitedCountriesData.sort(nameCompare);
  visitedCountriesData.sort(nameCompare);

  return (
    <Grid gap={8} padding={8} templateColumns={{ lg: "1fr 1fr" }}>
      <GridItem colSpan={{ lg: 2 }}>
        <WorldMap
          ref={worldMapRef}
          onCountryClick={toggleCountry}
          visitedCountriesData={visitedCountriesData}
        />
      </GridItem>
      <GridItem>
        <CountryList
          onCountryAdd={toggleMapCountry}
          onCountryRemove={toggleMapCountry}
          unvisitedCountriesData={unvisitedCountriesData}
          visitedCountriesData={visitedCountriesData}
        />
      </GridItem>
      <GridItem>
        <Achievements visitedCountriesData={visitedCountriesData} />
      </GridItem>
    </Grid>
  );
}
