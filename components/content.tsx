import { Box, Divider, Grid, GridItem, VStack } from '@chakra-ui/react'
import { visitsQuery, wishesQuery } from '../lib/evolu'
import Achievements from './achievements'
import Countries from './countries'
import WorldMap from './world-map'

export default function Content() {
  return (
    <Box>
      <WorldMap />
      <Divider />
      <Grid gap={8} padding={8} templateColumns={{ lg: '1fr 1fr' }}>
        <GridItem>
          <VStack align="stretch" spacing={8}>
            <Countries
              title="Visited countries"
              table="visits"
              query={visitsQuery}
            />
            <Countries
              title="Travel wishlist"
              table="wishes"
              query={wishesQuery}
            />
          </VStack>
        </GridItem>
        <GridItem>
          <Achievements />
        </GridItem>
      </Grid>
    </Box>
  )
}
