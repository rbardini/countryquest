import type { DataItem, Root } from '@amcharts/amcharts5'
import type {
  IMapPolygonSeriesDataItem,
  MapChart,
  MapPolygonSeries,
} from '@amcharts/amcharts5/map'
import { useAtom, useAtomValue } from 'jotai'
import { useAtomCallback } from 'jotai/utils'
import type { RefObject } from 'react'
import { useCallback, useEffect, useRef } from 'react'
import { visitsAtom, wishesAtom } from '../atoms/countries'
import geodata from '../data/geodata'
import theme from '../theme'
import useColorModeToken from './use-color-mode-token'

export type ChartRef = {
  root: Root
  chart: MapChart
  series: MapPolygonSeries
}

export enum Value {
  None = 0,
  Wish = 0.2,
  Visit = 1,
}

export default function useChart(
  containerRef: RefObject<HTMLElement>,
  onChartReady: (
    this: unknown,
    event: { type: 'frameended'; target: Root },
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
        { color, Root },
        { geoNaturalEarth1, MapChart, MapPolygonSeries, ZoomControl },
        { default: Animated },
      ] = await Promise.all([
        import('@amcharts/amcharts5'),
        import('@amcharts/amcharts5/map'),
        import('@amcharts/amcharts5/themes/Animated'),
      ])

      if (disposed) return

      const root = Root.new(containerRef.current)
      root.setThemes([Animated.new(root)])
      root.events.once('frameended', onChartReady)

      const zoomControl = ZoomControl.new(root, {})
      ;[zoomControl.plusButton, zoomControl.minusButton].forEach(button => {
        const icon = button.get('icon')!
        const background = button.get('background')!

        icon.setAll({ stroke: color(blue500) })
        background.setAll({ fill: color(white), stroke: color(gray100) })
        background.states.create('hover', {}).setAll({ fill: color(gray200) })
        background.states.create('down', {}).setAll({ fill: color(gray300) })
      })

      const chart = root.container.children.push(
        MapChart.new(root, {
          projection: geoNaturalEarth1(),
          zoomControl,
        }),
      )

      const data: Record<string, number> = {}
      ;(await readWishedCountriesData()).forEach(
        ({ id }) => (data[id] = Value.Wish),
      )
      ;(await readVisitedCountriesData()).forEach(
        ({ id }) => (data[id] = Value.Visit),
      )

      const series = chart.series.push(
        MapPolygonSeries.new(root, {
          geoJSON: geodata,
          valueField: 'value',
          interactive: true,
        }),
      )
      series.set('heatRules', [
        {
          target: series.mapPolygons.template,
          dataField: 'value',
          min: color(gray100),
          max: color(blue500),
          minValue: 0,
          maxValue: 1,
          key: 'fill',
        },
      ])
      series.data.setAll(
        Object.entries(data).map(([id, value]) => ({ id, value })),
      )

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
        const isVisited = dataItem.get('value') === Value.Visit

        setVisits({ action: isVisited ? 'remove' : 'add', id })
      })

      chartRef.current = { root, chart, series }
    })()

    return () => {
      disposed = true

      chartRef.current?.root.dispose()
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
      const dataItem = series.getDataItemById(id)!
      const value = dataItem.get('value')

      if (value) dataItem.set('value', Value.None)
    })

    wishedCountriesData.forEach(({ id }) => {
      const dataItem = series.getDataItemById(id)!
      const value = dataItem.get('value')

      if (!value) dataItem.set('value', Value.Wish)
    })

    visitedCountriesData.forEach(({ id }) => {
      const dataItem = series.getDataItemById(id)!
      const value = dataItem.get('value')

      if (value !== Value.Visit) dataItem.set('value', Value.Visit)
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
