import { useRef } from "react";
import { Box } from "@chakra-ui/react";
import { useTheme } from "@amcharts/amcharts4/core";
import animatedTheme from "@amcharts/amcharts4/themes/animated";
import useChart from "../hooks/use-chart";

useTheme(animatedTheme);

export default function WorldMap({ countriesData, onCountryClick }) {
  const containerRef = useRef(null);
  useChart(containerRef, countriesData, onCountryClick);

  return <Box ref={containerRef} height="500px" />;
}
