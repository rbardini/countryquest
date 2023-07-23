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
import { useAtom, useAtomValue } from 'jotai'
import achievementsAtom from '../atoms/achievements'
import { visitsAtom, wishesAtom } from '../atoms/countries'
import Achievement from './achievement'

export default function Achievements() {
  const { loading: loadingVisits } = useAtomValue(visitsAtom)
  const { loading: loadingWishes } = useAtomValue(wishesAtom)
  const [{ achievements, completedCount, includesWishes }, setIncludesWishes] =
    useAtom(achievementsAtom)
  const completedCountColor = useColorModeValue('gray.300', 'gray.600')
  const isLoading = loadingVisits || loadingWishes

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
        {achievements.map(achievement => (
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
