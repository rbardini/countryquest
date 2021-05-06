import { Box, Link, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box backgroundColor="gray.50" padding={8}>
      <Text align="center">
        Made with ❤️ by{" "}
        <Link color="blue.500" href="https://rbardini.com/">
          Rafael Bardini
        </Link>
      </Text>
    </Box>
  );
}
