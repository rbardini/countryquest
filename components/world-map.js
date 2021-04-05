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
import animatedTheme from "@amcharts/amcharts4/themes/animated";
import { countryCodeEmoji } from "country-code-emoji";
import Stats from "../components/stats";
import geodata from "../data/geodata";
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
    map.geodata = geodata;
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

  const countriesData = [...countries]
    .map(
      (country) => geodata.features.find(({ id }) => id === country).properties
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <div ref={containerRef} className={styles.chart} />
      <ul className={styles.list}>
        {countriesData.map(({ id, name }) => (
          <li key={id}>
            {countryCodeEmoji(id)} {name}
          </li>
        ))}
      </ul>
      <Stats countriesData={countriesData} />
    </>
  );
}
