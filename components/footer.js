import { Box, Link, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box backgroundColor={useColorModeValue("gray.50", "gray.700")} padding={8}>
      <Text align="center">
        Made with ❤️ by{" "}
        <Link
          color={useColorModeValue("blue.500", "blue.200")}
          href="https://rbardini.com/"
        >
          Rafael Bardini
        </Link>
      </Text>
    </Box>
  );
}
