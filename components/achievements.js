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

const MotionHStack = motion(HStack);

export default function Achievements({ visitedCountriesData }) {
  const formattedAchievements = achievements
    .map((achievement) => {
      const value = achievement.value(visitedCountriesData);
      const progress = value / achievement.max;
      const completed = progress === 1;

      return {
        ...achievement,
        completed,
        formattedMaxValue: achievement.formatValue(achievement.max),
        formattedValue: achievement.formatValue(value),
        progress,
        value,
      };
    })
    .sort((a, b) => b.progress - a.progress);

  const completedCount = formattedAchievements.filter(
    ({ completed }) => completed
  ).length;

  return (
    <VStack align="stretch">
      <Heading>
        Achievements{" "}
        <Text as="i" color="gray.300">
          {completedCount}
        </Text>
      </Heading>
      <SimpleGrid minChildWidth="20em" spacing={2}>
        {formattedAchievements.map(
          ({
            description,
            formattedMaxValue,
            formattedValue,
            name,
            progress,
            unit,
          }) => (
            <MotionHStack
              key={name}
              alignItems="center"
              borderRadius="lg"
              borderWidth="1px"
              layout="position"
              padding={4}
              spacing={4}
            >
              <Text as="span" fontSize="5xl" lineHeight="1">
                🏆
              </Text>
              <Box flex={1}>
                <Heading as="h3" fontSize="1xl">
                  {name}
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
              </Box>
            </MotionHStack>
          )
        )}
      </SimpleGrid>
    </VStack>
  );
}
