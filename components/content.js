import { Grid, GridItem } from "@chakra-ui/react";
import { useRef, useState } from "react";
import geodata from "../data/geodata";
import Achievements from "./achievements";
import CountryList from "./country-list";
import worldMap from "./world-map";
import WorldMap from "./world-map";

const STORAGE_KEY = "countries";

export default function Content() {
  const worldMapRef = useRef(null);

  const [countries, setCountries] = useState(
    new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)))
  );

  const onCountryClick = (id) =>
    setCountries((countries) => {
      countries.delete(id) || countries.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...countries]));
      return new Set(countries);
    });

  const countriesData = [...countries]
    .map(
      (country) => geodata.features.find(({ id }) => id === country).properties
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Grid gap={8} padding={8} templateColumns={{ lg: "1fr 1fr" }}>
      <GridItem colSpan={{ lg: 2 }}>
        <WorldMap
          ref={worldMapRef}
          countriesData={countriesData}
          onCountryClick={onCountryClick}
        />
      </GridItem>
      <GridItem>
        <CountryList
          countriesData={countriesData}
          onCountryClick={(id) => {
            worldMapRef.current?.toggle(id);
            onCountryClick(id);
          }}
        />
      </GridItem>
      <GridItem>
        <Achievements countriesData={countriesData} />
      </GridItem>
    </Grid>
  );
}
