import { AspectRatio, Box, Skeleton, useBoolean } from '@chakra-ui/react'
import { useAtomValue } from 'jotai/utils'
import { useRef } from 'react'
import { visitsAtom } from '../atoms/countries'
import useChart from '../hooks/use-chart'

export default function WorldMap() {
  const { loading } = useAtomValue(visitsAtom)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isChartReady, { on: setIsChartReady }] = useBoolean()
  useChart(containerRef, setIsChartReady)

  return (
    <AspectRatio ratio={21 / 9}>
      <>
        <Skeleton isLoaded={!loading && isChartReady} />
        <Box ref={containerRef} display="block !important" />
      </>
    </AspectRatio>
  )
}
