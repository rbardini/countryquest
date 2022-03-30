import {
  Box,
  Heading,
  HStack,
  Progress,
  Skeleton,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { CalculatedAchievement } from '../atoms/achievements'

const MotionHStack = motion(HStack)

type Props = {
  isLoading?: boolean
  includesWishes?: boolean
  achievement: CalculatedAchievement
}

export default function Achievement({
  isLoading = false,
  includesWishes = false,
  achievement: {
    description,
    formattedMaxValue,
    formattedValue,
    name,
    progress,
    unit,
  },
}: Props) {
  return (
    <MotionHStack
      layoutId={name}
      alignItems="center"
      borderRadius="lg"
      borderWidth="1px"
      // Avoid skeleton translations on load
      layout={!isLoading && 'position'}
      padding={4}
      spacing={4}
    >
      <Skeleton borderRadius="full" isLoaded={!isLoading}>
        <Text as="span" fontSize="5xl" lineHeight="1">
          🏆
        </Text>
      </Skeleton>
      <Box flex={1}>
        <SkeletonText isLoaded={!isLoading}>
          <Heading as="h3" fontSize="1xl">
            {name}
          </Heading>
          <Text fontSize="sm">{description}</Text>
          <HStack>
            <Progress
              borderRadius="full"
              flex="1"
              hasStripe={includesWishes}
              max={1}
              value={progress}
            />
            <Text fontSize="xs" textAlign="end">
              {formattedValue} / {formattedMaxValue} {unit}
            </Text>
          </HStack>
        </SkeletonText>
      </Box>
    </MotionHStack>
  )
}
