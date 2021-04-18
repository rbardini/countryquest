import { useRef } from "react";
import { useTheme } from "@amcharts/amcharts4/core";
import animatedTheme from "@amcharts/amcharts4/themes/animated";
import useChart from "../hooks/use-chart";
import styles from "../styles/WorldMap.module.css";

useTheme(animatedTheme);

export default function WorldMap({ countriesData, onCountryClick }) {
  const containerRef = useRef(null);
  useChart(containerRef, countriesData, onCountryClick);

  return <div ref={containerRef} className={styles.chart} />;
}
