import type { MapChart } from '@amcharts/amcharts4/maps'
import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'
import geodata from '../data/geodata'
import useColorModeToken from './use-color-mode-token'
import type { CountryChangeHandler } from './use-countries'
import type { CountryData } from './use-countries-data'

export type ChartRef = { chart: MapChart; toggle: (id: string) => void }

const defaultChartReadyHandler = () => {}

export default function useChart(
  isLoading = false,
  containerRef: RefObject<HTMLElement>,
  countriesData: CountryData[],
  onCountryAdd: CountryChangeHandler,
  onCountryRemove: CountryChangeHandler,
  onChartReady = defaultChartReadyHandler,
) {
  const white = useColorModeToken('colors', 'white', 'gray.800')
  const gray100 = useColorModeToken('colors', 'gray.100', 'gray.700')
  const gray200 = useColorModeToken('colors', 'gray.200', 'gray.600')
  const gray300 = useColorModeToken('colors', 'gray.300', 'gray.500')
  const blue500 = useColorModeToken('colors', 'blue.500', 'blue.200')
  const chartRef = useRef<ChartRef>()

  useEffect(() => {
    if (isLoading) return

    let disposed = false

    ;(async () => {
      if (containerRef.current == null) return

      const [
        { color, create, MouseCursorStyle },
        { MapChart, MapPolygonSeries, projections, ZoomControl },
      ] = await Promise.all([
        import('@amcharts/amcharts4/core'),
        import('@amcharts/amcharts4/maps'),
      ])

      if (disposed) return

      const zoomControl = new ZoomControl()
      ;[zoomControl.plusButton, zoomControl.minusButton].forEach(button => {
        button.background.fill = color(white)
        button.background.stroke = color(gray100)
        button.background.states.getKey('hover')!.properties.fill =
          color(gray200)
        button.background.states.getKey('down')!.properties.fill =
          color(gray300)
        button.stroke = color(blue500)
      })

      const chart = create(containerRef.current, MapChart)
      chart.hiddenState.properties.opacity = 0
      chart.geodata = geodata
      chart.projection = new projections.NaturalEarth1()
      chart.zoomControl = zoomControl
      chart.events.on('ready', onChartReady)

      const series = chart.series.push(new MapPolygonSeries())
      series.useGeodata = true
      series.data = countriesData.map(({ id }) => ({ id, value: 1 }))
      series.heatRules.push({
        property: 'fill',
        target: series.mapPolygons.template,
        min: color(gray100),
        max: color(blue500),
        minValue: 0,
        maxValue: 1,
      })

      const template = series.mapPolygons.template
      template.tooltipText = '{name}'
      template.cursorOverStyle = MouseCursorStyle.pointer
      template.fill = color(gray100)
      template.stroke = color(gray200)
      template.states.create('hover').properties.opacity = 0.6
      template.events.on('hit', async ({ target: { dataItem } }) => {
        const { id } = dataItem.dataContext as CountryData
        const added = (dataItem.value ^= 1)

        const { error } = added
          ? await onCountryAdd(id)
          : await onCountryRemove(id)

        if (error) dataItem.value ^= 1
      })

      chartRef.current = {
        chart,
        toggle: id => series.getPolygonById(id).dispatchImmediately('hit'),
      }
    })()

    return () => {
      disposed = true

      chartRef.current?.chart.dispose()
      chartRef.current = undefined
    }

    // Ignore `countriesData` dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLoading,
    containerRef,
    onCountryAdd,
    onCountryRemove,
    onChartReady,
    white,
    gray100,
    gray200,
    gray300,
    blue500,
  ])

  return chartRef
}
