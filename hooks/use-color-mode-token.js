import { useColorMode, useToken } from "@chakra-ui/react";

export default function useColorModeToken(
  scale,
  lightToken,
  darkToken,
  fallback
) {
  const { colorMode } = useColorMode();

  return useToken(
    scale,
    colorMode === "light" ? lightToken : darkToken,
    fallback
  );
}
