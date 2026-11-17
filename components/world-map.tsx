import { AspectRatio, Box, Skeleton, useBoolean } from '@chakra-ui/react'
import { useRef } from 'react'
import useChart from '../hooks/use-chart'

export default function WorldMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isChartReady, { on: setIsChartReady }] = useBoolean()
  useChart(containerRef, setIsChartReady)

  return (
    <AspectRatio ratio={21 / 9}>
      <>
        <Skeleton isLoaded={isChartReady} />
        <Box ref={containerRef} display="block !important" />
      </>
    </AspectRatio>
  )
}
