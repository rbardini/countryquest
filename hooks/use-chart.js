import { useLayoutEffect } from "react";
import { MouseCursorStyle, color, create } from "@amcharts/amcharts4/core";
import {
  MapChart,
  MapPolygonSeries,
  projections,
} from "@amcharts/amcharts4/maps";
import geodata from "../data/geodata";

const BASE_COLOR = "#d9d9d9";

export default function useChart(containerRef, countriesData, onCountryClick) {
  useLayoutEffect(() => {
    const map = create(containerRef.current, MapChart);
    map.hiddenState.properties.opacity = 0;
    map.geodata = geodata;
    map.projection = new projections.NaturalEarth1();

    const series = map.series.push(new MapPolygonSeries());
    series.useGeodata = true;
    series.data = countriesData.map(({ id }) => ({ id, value: 1 }));
    series.heatRules.push({
      property: "fill",
      target: series.mapPolygons.template,
      min: color(BASE_COLOR),
      max: color(BASE_COLOR).brighten(-0.75),
      minValue: 0,
      maxValue: 1,
    });

    const template = series.mapPolygons.template;
    template.tooltipText = "{name}";
    template.cursorOverStyle = MouseCursorStyle.pointer;
    template.fill = color(BASE_COLOR);
    template.events.on("hit", ({ target: { dataItem } }) => {
      dataItem.value ^= 1;
      onCountryClick(dataItem.dataContext.id);
    });

    return () => map.dispose();
  }, []);
}
