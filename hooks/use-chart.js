import { useLayoutEffect, useRef } from "react";
import { useToken } from "@chakra-ui/react";
import { MouseCursorStyle, color, create } from "@amcharts/amcharts4/core";
import {
  MapChart,
  MapPolygonSeries,
  projections,
} from "@amcharts/amcharts4/maps";
import geodata from "../data/geodata";

export default function useChart(containerRef, countriesData, onCountryClick) {
  const [gray100, blue500] = useToken("colors", ["gray.100", "blue.500"]);
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const chart = create(containerRef.current, MapChart);
    chart.hiddenState.properties.opacity = 0;
    chart.geodata = geodata;
    chart.projection = new projections.NaturalEarth1();

    const series = chart.series.push(new MapPolygonSeries());
    series.useGeodata = true;
    series.data = countriesData.map(({ id }) => ({ id, value: 1 }));
    series.heatRules.push({
      property: "fill",
      target: series.mapPolygons.template,
      min: color(gray100),
      max: color(blue500),
      minValue: 0,
      maxValue: 1,
    });

    const template = series.mapPolygons.template;
    template.tooltipText = "{name}";
    template.cursorOverStyle = MouseCursorStyle.pointer;
    template.fill = color(gray100);
    template.events.on("hit", ({ target: { dataItem } }) => {
      dataItem.value ^= 1;
      onCountryClick(dataItem.dataContext.id);
    });

    chartRef.current = {
      chart,
      toggle: (id) => {
        chart.series.values[0].dataItems.values.find(
          ({ dataContext }) => dataContext.id === id
        ).value ^= 1;
      },
    };

    return () => {
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  return chartRef;
}
