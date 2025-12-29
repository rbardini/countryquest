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
import Achievement from './achievement'

export default function Achievements() {
  const [includesWishes, setIncludesWishes] = useState(false)
  const { achievements, completedCount } = useAchievements(includesWishes)
  const completedCountColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <VStack align="stretch">
      <Flex wrap="wrap" justifyContent="space-between">
        <Heading>
          Achievements{' '}
          <Text as="span" color={completedCountColor}>
            {completedCount}
          </Text>
        </Heading>
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
      </Flex>
      <SimpleGrid minChildWidth="20em" spacing={2}>
        {achievements.map(achievement => (
          <Achievement
            key={achievement.name}
            includesWishes={includesWishes}
            achievement={achievement}
          />
        ))}
      </SimpleGrid>
    </VStack>
  )
}
