import {
  Box,
  Center,
  Divider,
  Grid,
  GridItem,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { useRef } from 'react'
import useCountries from '../hooks/use-countries'
import useCountriesData from '../hooks/use-countries-data'
import Achievements from './achievements'
import Countries from './countries'
import WorldMap from './world-map'

export default function Content() {
  const worldMapRef = useRef(null)
  const [visits, addVisit, removeVisit] = useCountries('visits')
  const [wishes, addWish, removeWish] = useCountries('wishes')
  const [visitedCountriesData, unvisitedCountriesData] = useCountriesData(
    visits.countries,
  )
  const [wishedCountriesData, unwishedCountriesData] = useCountriesData(
    wishes.countries,
  )
  const [combinedCountriesData] = useCountriesData(
    new Set([...visits.countries, ...wishes.countries]),
  )

  const isLoading = visits.loading || wishes.loading
  const toggleMapCountry = id => worldMapRef.current?.toggle(id)

  return isLoading ? (
    <Center blockSize="80vh">
      <Spinner color="gray.300" size="xl" />
    </Center>
  ) : (
    <Box>
      <WorldMap
        ref={worldMapRef}
        onCountryAdd={addVisit}
        onCountryRemove={removeVisit}
        visitedCountriesData={visitedCountriesData}
      />
      <Divider />
      <Grid gap={8} padding={8} templateColumns={{ lg: '1fr 1fr' }}>
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
              onCountryAdd={addWish}
              onCountryRemove={removeWish}
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
  )
}
