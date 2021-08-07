import { AspectRatio, Box } from '@chakra-ui/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import useChart from '../hooks/use-chart'

export default forwardRef(function WorldMap(
  { onCountryClick, visitedCountriesData },
  ref,
) {
  const containerRef = useRef(null)
  const chartRef = useChart(containerRef, visitedCountriesData, onCountryClick)
  useImperativeHandle(ref, () => chartRef.current)

  return (
    <AspectRatio ratio={21 / 9}>
      <Box ref={containerRef} />
    </AspectRatio>
  )
})
