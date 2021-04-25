import { useRef } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import { useTheme } from "@amcharts/amcharts4/core";
import animatedTheme from "@amcharts/amcharts4/themes/animated";
import useChart from "../hooks/use-chart";

useTheme(animatedTheme);

export default function WorldMap({ countriesData, onCountryClick }) {
  const containerRef = useRef(null);
  useChart(containerRef, countriesData, onCountryClick);

  return (
    <AspectRatio marginInline="auto" maxInlineSize="130vh" ratio={2 / 1}>
      <Box ref={containerRef} />
    </AspectRatio>
  );
}
