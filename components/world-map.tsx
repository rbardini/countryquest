import { AspectRatio, Box } from '@chakra-ui/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { ChartRef } from '../hooks/use-chart'
import useChart from '../hooks/use-chart'
import type { CountryChangeHandler } from '../hooks/use-countries'
import type { CountryData } from '../hooks/use-countries-data'

type Props = {
  onCountryAdd: CountryChangeHandler
  onCountryRemove: CountryChangeHandler
  visitedCountriesData: CountryData[]
}

export default forwardRef<ChartRef | undefined, Props>(function WorldMap(
  { onCountryAdd, onCountryRemove, visitedCountriesData },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useChart(
    containerRef,
    visitedCountriesData,
    onCountryAdd,
    onCountryRemove,
  )
  useImperativeHandle(ref, () => chartRef.current)

  return (
    <AspectRatio ratio={21 / 9}>
      <Box ref={containerRef} />
    </AspectRatio>
  )
})
