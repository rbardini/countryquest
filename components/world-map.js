import { forwardRef, useImperativeHandle, useRef } from "react";
import { AspectRatio, Box } from "@chakra-ui/react";
import { useTheme } from "@amcharts/amcharts4/core";
import animatedTheme from "@amcharts/amcharts4/themes/animated";
import useChart from "../hooks/use-chart";

useTheme(animatedTheme);

export default forwardRef(function WorldMap(
  { onCountryClick, visitedCountriesData },
  ref
) {
  const containerRef = useRef(null);
  const chartRef = useChart(containerRef, visitedCountriesData, onCountryClick);
  useImperativeHandle(ref, () => chartRef.current);

  return (
    <AspectRatio marginInline="auto" maxInlineSize="130vh" ratio={2 / 1}>
      <Box ref={containerRef} />
    </AspectRatio>
  );
});
