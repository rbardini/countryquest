import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Progress,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import useAchievements from '../hooks/use-achievements'

const MotionHStack = motion(HStack)

export default function Achievements({
  combinedCountriesData,
  visitedCountriesData,
}) {
  const [includeWishes, setIncludeWishes] = useState(false)
  const [formattedAchievements, completedCount] = useAchievements(
    includeWishes ? combinedCountriesData : visitedCountriesData,
  )

  return (
    <VStack align="stretch">
      <Flex wrap="wrap" justifyContent="space-between">
        <Heading>
          Achievements{' '}
          <Text as="i" color={useColorModeValue('gray.300', 'gray.600')}>
            {completedCount}
          </Text>
        </Heading>
        <FormControl alignItems="center" display="flex" width="auto">
          <FormLabel htmlFor="incl-wishes" marginBlock="0">
            Include wishes
          </FormLabel>
          <Switch
            id="incl-wishes"
            isChecked={includeWishes}
            onChange={({ target }) => setIncludeWishes(target.checked)}
          />
        </FormControl>
      </Flex>
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
                    flex="1"
                    hasStripe={includeWishes}
                    max={1}
                    value={progress}
                  ></Progress>
                  <Text fontSize="xs" textAlign="end">
                    {formattedValue} / {formattedMaxValue} {unit}
                  </Text>
                </HStack>
              </Box>
            </MotionHStack>
          ),
        )}
      </SimpleGrid>
    </VStack>
  )
}
