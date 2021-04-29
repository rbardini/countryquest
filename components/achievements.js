import {
  Box,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import achievements from "../data/achievements";

const MotionBox = motion(Box);

export default function Achievements({ visitedCountriesData }) {
  return (
    <VStack align="stretch">
      <Heading>Achievements</Heading>
      <SimpleGrid minChildWidth="20em" spacing={2}>
        {achievements
          .map((achievement) => {
            const value = achievement.value(visitedCountriesData);
            return {
              ...achievement,
              formattedMaxValue: achievement.formatValue(achievement.max),
              formattedValue: achievement.formatValue(value),
              progress: value / achievement.max,
              value,
            };
          })
          .sort((a, b) => b.progress - a.progress)
          .map(
            ({
              description,
              formattedMaxValue,
              formattedValue,
              name,
              progress,
              unit,
            }) => (
              <MotionBox
                key={name}
                borderRadius="lg"
                borderWidth="1px"
                layout="position"
                padding={4}
              >
                <Heading as="h3" fontSize="1xl">
                  🏆 {name}
                </Heading>
                <Text>{description}</Text>
                <HStack>
                  <Progress
                    borderRadius="full"
                    flex={1}
                    max={1}
                    value={progress}
                  ></Progress>
                  <Text fontSize="xs" textAlign="end">
                    {formattedValue} / {formattedMaxValue} {unit}
                  </Text>
                </HStack>
              </MotionBox>
            )
          )}
      </SimpleGrid>
    </VStack>
  );
}
