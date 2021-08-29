import { SmallAddIcon } from '@chakra-ui/icons'
import {
  Heading,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { countryCodeEmoji } from 'country-code-emoji'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { CountryData } from '../hooks/use-countries-data'

const MotionWrapItem = motion(WrapItem)

type OnCountryChange = (id: string) => void
type Props = {
  excludedCountriesData: CountryData[]
  includedCountriesData: CountryData[]
  onCountryAdd: OnCountryChange
  onCountryRemove: OnCountryChange
  title: ReactNode
}

export default function Countries({
  excludedCountriesData,
  includedCountriesData,
  onCountryAdd,
  onCountryRemove,
  title,
}: Props) {
  const countColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <VStack align="stretch">
      <Heading>
        {title}{' '}
        <Text as="i" color={countColor}>
          {includedCountriesData.length}
        </Text>
      </Heading>
      <Wrap>
        {includedCountriesData.map(({ id, name }) => (
          <MotionWrapItem key={id} layout="position">
            <Tag size="lg" borderRadius="full">
              <TagLabel>
                {countryCodeEmoji(id)} {name}
              </TagLabel>
              <TagCloseButton onClick={() => onCountryRemove(id)} />
            </Tag>
          </MotionWrapItem>
        ))}
        {excludedCountriesData.length > 0 && (
          <MotionWrapItem layout="position">
            <Select
              borderRadius="full"
              color="gray.500"
              icon={<SmallAddIcon />}
              iconColor={countColor}
              maxWidth="13ch"
              onChange={({ target }) => onCountryAdd(target.value)}
              placeholder="Add country"
              size="sm"
              value=""
            >
              {excludedCountriesData.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Select>
          </MotionWrapItem>
        )}
      </Wrap>
    </VStack>
  )
}
