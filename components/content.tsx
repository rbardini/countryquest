import { Box, Divider, Grid, GridItem, VStack } from '@chakra-ui/react'
import Achievements from './achievements'
import Visits from './visits'
import Wishes from './wishes'
import WorldMap from './world-map'

export default function Content() {
  return (
    <Box>
      <WorldMap />
      <Divider />
      <Grid gap={8} padding={8} templateColumns={{ lg: '1fr 1fr' }}>
        <GridItem>
          <VStack align="stretch" spacing={8}>
            <Visits />
            <Wishes />
          </VStack>
        </GridItem>
        <GridItem>
          <Achievements />
        </GridItem>
      </Grid>
    </Box>
  )
}
