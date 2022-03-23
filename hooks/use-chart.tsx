import type { MapChart, MapPolygonSeries } from '@amcharts/amcharts4/maps'
import { useAtom, useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import type { RefObject } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { visitsAtom, wishesAtom } from '../atoms/countries'
import type { CountryData } from '../data/geodata'
import geodata from '../data/geodata'
import useColorModeToken from './use-color-mode-token'

export type ChartRef = {
  chart: MapChart
  series: MapPolygonSeries
}

export default function useChart(
  containerRef: RefObject<HTMLElement>,
  onChartReady?: (
    this: unknown,
    event: { type: 'ready'; target: MapChart },
  ) => void,
) {
  const [
    {
      loading: loadingVisits,
      data: [visitedCountriesData, unvisitedCountriesData],
    },
    setVisits,
  ] = useAtom(visitsAtom)
  const {
    loading: loadingWishes,
    data: [wishedCountriesData, unwishedCountriesData],
  } = useAtomValue(wishesAtom)
  const readVisitedCountriesData = useAtomCallback(
    useCallback(get => get(visitsAtom).data[0], []),
  )
  const readWishedCountriesData = useAtomCallback(
    useCallback(get => get(wishesAtom).data[0], []),
  )
  const white = useColorModeToken('colors', 'white', 'gray.800')
  const gray100 = useColorModeToken('colors', 'gray.100', 'gray.700')
  const gray200 = useColorModeToken('colors', 'gray.200', 'gray.600')
  const gray300 = useColorModeToken('colors', 'gray.300', 'gray.500')
  const blue500 = useColorModeToken('colors', 'blue.500', 'blue.200')
  const chartRef = useRef<ChartRef>()

  useEffect(() => {
    if (loadingVisits || loadingWishes) return

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
      onChartReady && chart.events.on('ready', onChartReady)

      const data: Record<string, number> = {}
      ;(await readWishedCountriesData()).forEach(({ id }) => (data[id] = 0.2))
      ;(await readVisitedCountriesData()).forEach(({ id }) => (data[id] = 1))

      const series = chart.series.push(new MapPolygonSeries())
      series.useGeodata = true
      series.data = Object.entries(data).map(([id, value]) => ({ id, value }))
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
      template.events.on('hit', ({ target: { dataItem } }) => {
        const { id } = dataItem.dataContext as CountryData
        const isAdded = dataItem.value === 1

        setVisits({ action: isAdded ? 'remove' : 'add', id })
      })

      chartRef.current = { chart, series }
    })()

    return () => {
      disposed = true

      chartRef.current?.chart.dispose()
      chartRef.current = undefined
    }
  }, [
    containerRef,
    onChartReady,
    loadingVisits,
    loadingWishes,
    setVisits,
    readVisitedCountriesData,
    readWishedCountriesData,
    white,
    gray100,
    gray200,
    gray300,
    blue500,
  ])

  useEffect(() => {
    const series = chartRef.current?.series

    if (loadingVisits || loadingWishes || !series) return
    ;[...unvisitedCountriesData, ...unwishedCountriesData].forEach(({ id }) => {
      const { dataItem } = series.getPolygonById(id)
      if (dataItem.value) dataItem.value = 0
    })

    wishedCountriesData.forEach(({ id }) => {
      const { dataItem } = series.getPolygonById(id)
      if (!dataItem.value) dataItem.value = 0.2
    })

    visitedCountriesData.forEach(({ id }) => {
      const { dataItem } = series.getPolygonById(id)
      if (!dataItem.value || dataItem.value < 1) dataItem.value = 1
    })
  }, [
    loadingVisits,
    loadingWishes,
    visitedCountriesData,
    unvisitedCountriesData,
    wishedCountriesData,
    unwishedCountriesData,
  ])

  return chartRef
}
