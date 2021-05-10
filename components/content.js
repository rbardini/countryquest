import { Box, Divider, Grid, GridItem, VStack } from "@chakra-ui/react";
import { useRef } from "react";
import useCountries from "../hooks/use-countries";
import useCountriesData from "../hooks/use-countries-data";
import Achievements from "./achievements";
import Countries from "./countries";
import WorldMap from "./world-map";

export default function Content() {
  const worldMapRef = useRef(null);
  const [visits, toggleVisit] = useCountries("visits");
  const [wishes, toggleWish] = useCountries("wishes");
  const [visitedCountriesData, unvisitedCountriesData] = useCountriesData(
    visits
  );
  const [wishedCountriesData, unwishedCountriesData] = useCountriesData(wishes);
  const [combinedCountriesData] = useCountriesData(
    new Set([...visits, ...wishes])
  );

  const toggleMapCountry = (id) => worldMapRef.current?.toggle(id);

  return (
    <Box>
      <WorldMap
        ref={worldMapRef}
        onCountryClick={toggleVisit}
        visitedCountriesData={visitedCountriesData}
      />
      <Divider />
      <Grid gap={8} padding={8} templateColumns={{ lg: "1fr 1fr" }}>
        <GridItem>
          <VStack align="stretch" spacing={8}>
            <Countries
              excludedCountriesData={unvisitedCountriesData}
              includedCountriesData={visitedCountriesData}
              onCountryAdd={toggleMapCountry}
              onCountryRemove={toggleMapCountry}
              title="Visited countries"
            />
            <Countries
              excludedCountriesData={unwishedCountriesData}
              includedCountriesData={wishedCountriesData}
              onCountryAdd={toggleWish}
              onCountryRemove={toggleWish}
              title="Travel wishlist"
            />
          </VStack>
        </GridItem>
        <GridItem>
          <Achievements
            combinedCountriesData={combinedCountriesData}
            visitedCountriesData={visitedCountriesData}
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
