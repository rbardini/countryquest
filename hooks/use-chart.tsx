import type { DataItem, Root } from '@amcharts/amcharts5'
import type {
  IMapPolygonSeriesDataItem,
  MapChart,
  MapPolygonSeries,
} from '@amcharts/amcharts5/map'
import { useBoolean } from '@chakra-ui/react'
import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'
import geodata from '../data/geodata'
import theme from '../theme'
import useColorModeToken from './use-color-mode-token'
import useVisitedCountries from './use-visited-countries'
import useWishedCountries from './use-wished-countries'

export type ChartRef = {
  root: Root
  chart: MapChart
  series: MapPolygonSeries
}

export enum Value {
  None = 0,
  Wish = 0.25,
  Visit = 1,
}

const valueKey = 'value'

export default function useChart(
  containerRef: RefObject<HTMLElement | null>,
  onChartReady: (
    this: unknown,
    event: { type: 'frameended'; target: Root },
  ) => void,
) {
  const {
    visitedCountriesData,
    unvisitedCountriesData,
    onAddVisitedCountry,
    onRemoveVisitedCountry,
  } = useVisitedCountries()
  const { wishedCountriesData, unwishedCountriesData } = useWishedCountries()
  const white = useColorModeToken('colors', 'white', 'gray.800') as string
  const gray100 = useColorModeToken('colors', 'gray.100', 'gray.700') as string
  const gray200 = useColorModeToken('colors', 'gray.200', 'gray.600') as string
  const gray300 = useColorModeToken('colors', 'gray.300', 'gray.500') as string
  const purple500 = useColorModeToken(
    'colors',
    'purple.500',
    'purple.200',
  ) as string
  const chartRef = useRef<ChartRef>(undefined)
  const [initialized, setInitialized] = useBoolean()

  useEffect(() => {
    let disposed = false

    ;(async () => {
      if (disposed || containerRef.current == null) return

      const [
        { color, Root },
        { geoNaturalEarth1, MapChart, MapPolygonSeries, ZoomControl },
        { default: Animated },
      ] = await Promise.all([
        import('@amcharts/amcharts5'),
        import('@amcharts/amcharts5/map'),
        import('@amcharts/amcharts5/themes/Animated'),
      ])

      const root = Root.new(containerRef.current)
      root.setThemes([Animated.new(root)])
      root.events.once('frameended', onChartReady)

      const zoomControl = ZoomControl.new(root, {})
      ;[zoomControl.plusButton, zoomControl.minusButton].forEach(button => {
        const icon = button.get('icon')!
        const background = button.get('background')!

        icon.setAll({ stroke: color(purple500) })
        background.setAll({ fill: color(white), stroke: color(gray100) })
        background.states.create('hover', {}).setAll({ fill: color(gray200) })
        background.states.create('down', {}).setAll({ fill: color(gray300) })
        background.states
          .create('disabled', {})
          .setAll({ fill: color(gray100) })
      })

      const chart = root.container.children.push(
        MapChart.new(root, {
          projection: geoNaturalEarth1(),
          zoomControl,
        }),
      )

      const series = chart.series.push(
        MapPolygonSeries.new(root, {
          geoJSON: geodata,
          valueField: valueKey,
          interactive: true,
        }),
      )
      series.set('heatRules', [
        {
          target: series.mapPolygons.template,
          dataField: valueKey,
          min: color(gray100),
          max: color(purple500),
          minValue: 0,
          maxValue: 1,
          key: 'fill',
        },
      ])

      const { template } = series.mapPolygons
      template.setAll({
        tooltipText: `[fontFamily:${theme.fonts.body}]{name}[/]`,
        cursorOverStyle: 'pointer',
        fill: color(gray100),
        stroke: color(gray300),
      })
      template.states.create('hover', { opacity: 0.6 })
      template.events.on('click', ({ target }) => {
        const dataItem = target.dataItem as DataItem<IMapPolygonSeriesDataItem>
        const id = dataItem.get('id')!
        const isVisited = dataItem.get(valueKey) === Value.Visit

        isVisited ? onRemoveVisitedCountry(id) : onAddVisitedCountry(id)
      })

      chartRef.current = { root, chart, series }

      // Delay to prevent state change from being batched and not picked up by the effect below
      setTimeout(setInitialized.on, 0)
    })()

    return () => {
      disposed = true

      chartRef.current?.root.dispose()
      chartRef.current = undefined
      setInitialized.off()
    }
  }, [
    containerRef,
    onChartReady,
    onAddVisitedCountry,
    onRemoveVisitedCountry,
    setInitialized,
    white,
    gray100,
    gray200,
    gray300,
    purple500,
  ])

  useEffect(() => {
    if (!initialized) return

    const series = chartRef.current?.series
    if (!series) return
    ;[...unvisitedCountriesData, ...unwishedCountriesData].forEach(({ id }) => {
      const dataItem = series.getDataItemById(id)!
      const value = dataItem.get(valueKey)

      if (value) dataItem.set(valueKey, Value.None)
    })

    wishedCountriesData.forEach(({ id }) => {
      const dataItem = series.getDataItemById(id)!
      const value = dataItem.get(valueKey)

      if (!value) dataItem.set(valueKey, Value.Wish)
    })

    visitedCountriesData.forEach(({ id }) => {
      const dataItem = series.getDataItemById(id)!
      const value = dataItem.get(valueKey)

      if (value !== Value.Visit) dataItem.set(valueKey, Value.Visit)
    })
  }, [
    initialized,
    unvisitedCountriesData,
    unwishedCountriesData,
    visitedCountriesData,
    wishedCountriesData,
  ])

  return chartRef
}
