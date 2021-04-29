import {
  Box,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import achievements from "../data/achievements";

export default function Achievements({ visitedCountriesData }) {
  return (
    <VStack align="stretch">
      <Heading>Achievements</Heading>
      <SimpleGrid minChildWidth="20em" spacing={2}>
        {achievements.map(
          ({ description, formatValue, max, name, unit, value }) => (
            <Box key={name} borderRadius="lg" borderWidth="1px" padding={4}>
              <Heading as="h3" fontSize="1xl">
                🏆 {name}
              </Heading>
              <Text>{description}</Text>
              <HStack>
                <Progress
                  borderRadius="full"
                  flex={1}
                  max={1}
                  value={value(visitedCountriesData) / max}
                ></Progress>
                <Text fontSize="xs" textAlign="end">
                  {formatValue(value(visitedCountriesData))} /{" "}
                  {formatValue(max)} {unit}
                </Text>
              </HStack>
            </Box>
          )
        )}
      </SimpleGrid>
    </VStack>
  );
}
