import {
  Box,
  Card,
  CardBody,
  Heading,
  HStack,
  Progress,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { CalculatedAchievement } from '../hooks/use-achievements'

const MotionCard = motion(Card)

type Props = {
  includesWishes?: boolean
  achievement: CalculatedAchievement
}

export default function Achievement({
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
    <MotionCard
      layoutId={name}
      // Avoid skeleton translations on load
      layout="position"
      variant="outline"
    >
      <CardBody>
        <VStack align="stretch">
          <HStack>
            <Box flex="1">
              <Heading as="h3" fontSize="1xl">
                {name}
              </Heading>
              <Text fontSize="sm">{description}</Text>
            </Box>
            <Text as="span" fontSize="3xl" lineHeight="1">
              🏆
            </Text>
          </HStack>
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
        </VStack>
      </CardBody>
    </MotionCard>
  )
}
