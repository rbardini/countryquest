import { useLayoutEffect, useRef, useState } from "react";
import {
  MouseCursorStyle,
  color,
  create,
  useTheme,
} from "@amcharts/amcharts4/core";
import {
  MapChart,
  MapPolygonSeries,
  projections,
} from "@amcharts/amcharts4/maps";
import worldLowGeodata from "@amcharts/amcharts4-geodata/worldLow";
import animatedTheme from "@amcharts/amcharts4/themes/animated";
import { flag } from "country-emoji";
import styles from "../styles/WorldMap.module.css";

const BASE_COLOR = "#d9d9d9";
const STORAGE_KEY = "countries";

useTheme(animatedTheme);

export default function WorldMap() {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [countries, setCountries] = useState(
    new Set(JSON.parse(localStorage.getItem(STORAGE_KEY)))
  );
  const toggleCountry = (id) =>
    setCountries((countries) => {
      countries.delete(id) || countries.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...countries]));
      return new Set(countries);
    });

  useLayoutEffect(() => {
    const map = create(containerRef.current, MapChart);
    map.hiddenState.properties.opacity = 0;
    map.geodata = worldLowGeodata;
    map.projection = new projections.NaturalEarth1();

    const series = map.series.push(new MapPolygonSeries());
    series.useGeodata = true;
    series.data = [...countries].map((id) => ({ id, value: 1 }));
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
      toggleCountry(dataItem.dataContext.id);
    });

    mapRef.current = map;

    return () => map.dispose();
  }, []);

  return (
    <>
      <div ref={containerRef} className={styles.chart} />
      <ul className={styles.list}>
        {[...countries]
          .map(
            (country) =>
              worldLowGeodata.features.find(({ id }) => id === country)
                .properties.name
          )
          .sort()
          .map((country) => (
            <li key={country}>
              {flag(country)} {country}
            </li>
          ))}
      </ul>
    </>
  );
}
