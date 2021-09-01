import { Box, Divider, Grid, GridItem, VStack } from '@chakra-ui/react'
import { useRef } from 'react'
import type { ChartRef } from '../hooks/use-chart'
import useCountriesData from '../hooks/use-countries-data'
import useVisits from '../hooks/use-visits'
import useWishes from '../hooks/use-wishes'
import Achievements from './achievements'
import Countries from './countries'
import WorldMap from './world-map'

export default function Content() {
  const worldMapRef = useRef<ChartRef>(null)
  const [visits, addVisit, removeVisit] = useVisits()
  const [wishes, addWish, removeWish] = useWishes()
  const [visitedCountriesData, unvisitedCountriesData] = useCountriesData(
    visits.countries,
  )
  const [wishedCountriesData, unwishedCountriesData] = useCountriesData(
    wishes.countries,
  )
  const [combinedCountriesData] = useCountriesData(
    new Set([...visits.countries, ...wishes.countries]),
  )

  const toggleMapCountry = (id: string) => worldMapRef.current?.toggle(id)

  return (
    <Box>
      <WorldMap
        ref={worldMapRef}
        isLoading={visits.loading}
        onCountryAdd={addVisit}
        onCountryRemove={removeVisit}
        visitedCountriesData={visitedCountriesData}
      />
      <Divider />
      <Grid gap={8} padding={8} templateColumns={{ lg: '1fr 1fr' }}>
        <GridItem>
          <VStack align="stretch" spacing={8}>
            <Countries
              isLoading={visits.loading}
              excludedCountriesData={unvisitedCountriesData}
              includedCountriesData={visitedCountriesData}
              onCountryAdd={toggleMapCountry}
              onCountryRemove={toggleMapCountry}
              title="Visited countries"
            />
            <Countries
              isLoading={wishes.loading}
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
            isLoading={visits.loading || wishes.loading}
            combinedCountriesData={combinedCountriesData}
            visitedCountriesData={visitedCountriesData}
          />
        </GridItem>
      </Grid>
    </Box>
  )
}
