import { useLayoutEffect } from "react";
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

    return () => map.dispose();
  }, []);
}
