import { AspectRatio, Box, Skeleton, useBoolean } from '@chakra-ui/react'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { ChartRef } from '../hooks/use-chart'
import useChart from '../hooks/use-chart'
import type { CountryChangeHandler } from '../hooks/use-countries'
import type { CountryData } from '../hooks/use-countries-data'

type Props = {
  isLoading?: boolean
  onCountryAdd: CountryChangeHandler
  onCountryRemove: CountryChangeHandler
  visitedCountriesData: CountryData[]
}

export default forwardRef<ChartRef | undefined, Props>(function WorldMap(
  { isLoading = false, onCountryAdd, onCountryRemove, visitedCountriesData },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, { on: setIsReadyOn }] = useBoolean()
  const chartRef = useChart(
    isLoading,
    containerRef,
    visitedCountriesData,
    onCountryAdd,
    onCountryRemove,
    setIsReadyOn,
  )
  useImperativeHandle(ref, () => chartRef.current)

  return (
    <AspectRatio ratio={21 / 9}>
      <>
        <Skeleton isLoaded={!isLoading && isReady} />
        <Box ref={containerRef} />
      </>
    </AspectRatio>
  )
})
