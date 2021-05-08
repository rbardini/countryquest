import { useLayoutEffect, useRef } from "react";
import { useToken } from "@chakra-ui/react";
import { MouseCursorStyle, color, create } from "@amcharts/amcharts4/core";
import {
  MapChart,
  MapPolygonSeries,
  ZoomControl,
  projections,
} from "@amcharts/amcharts4/maps";
import geodata from "../data/geodata";

export default function useChart(containerRef, countriesData, onCountryClick) {
  const [white, gray100, gray200, blue500] = useToken("colors", [
    "white",
    "gray.100",
    "gray.200",
    "blue.500",
  ]);
  const chartRef = useRef(null);

  useLayoutEffect(() => {
    const zoomControl = new ZoomControl();
    [zoomControl.plusButton, zoomControl.minusButton].forEach((button) => {
      button.background.fill = color(white);
      button.background.stroke = color(gray100);
      button.background.states.getKey("hover").properties.fill = color(gray200);
      button.stroke = color(blue500);
    });

    const chart = create(containerRef.current, MapChart);
    chart.hiddenState.properties.opacity = 0;
    chart.geodata = geodata;
    chart.projection = new projections.NaturalEarth1();
    chart.zoomControl = zoomControl;

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
      toggle: (id) => series.getPolygonById(id).dispatchImmediately("hit"),
    };

    return () => {
      chart.dispose();
      chartRef.current = null;
    };
  }, []);

  return chartRef;
}
