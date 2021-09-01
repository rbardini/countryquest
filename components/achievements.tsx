import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  SimpleGrid,
  Switch,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'
import useAchievements from '../hooks/use-achievements'
import type { CountryData } from '../hooks/use-countries-data'
import Achievement from './achievement'

type Props = {
  isLoading?: boolean
  combinedCountriesData: CountryData[]
  visitedCountriesData: CountryData[]
}

export default function Achievements({
  isLoading = false,
  combinedCountriesData,
  visitedCountriesData,
}: Props) {
  const [includesWishes, setIncludesWishes] = useState(false)
  const [calculatedAchievements, completedCount] = useAchievements(
    includesWishes ? combinedCountriesData : visitedCountriesData,
  )
  const completedCountColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <VStack align="stretch">
      <Flex wrap="wrap" justifyContent="space-between">
        <Heading>
          Achievements{' '}
          {!isLoading && (
            <Text as="span" color={completedCountColor}>
              {completedCount}
            </Text>
          )}
        </Heading>
        {!isLoading && (
          <FormControl alignItems="center" display="flex" width="auto">
            <FormLabel htmlFor="incl-wishes" marginBlock="0">
              Include wishes
            </FormLabel>
            <Switch
              id="incl-wishes"
              isChecked={includesWishes}
              onChange={({ target }) => setIncludesWishes(target.checked)}
            />
          </FormControl>
        )}
      </Flex>
      <SimpleGrid minChildWidth="20em" spacing={2}>
        {calculatedAchievements.map(achievement => (
          <Achievement
            key={achievement.name}
            isLoading={isLoading}
            includesWishes={includesWishes}
            achievement={achievement}
          />
        ))}
      </SimpleGrid>
    </VStack>
  )
}
