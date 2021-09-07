import { SmallAddIcon } from '@chakra-ui/icons'
import {
  Heading,
  Select,
  Skeleton,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { CountryData, Updater } from '../lib/countries-atom-creator'

const MotionWrapItem = motion(WrapItem)

type Props = {
  isLoading?: boolean
  excludedCountriesData: CountryData[]
  includedCountriesData: CountryData[]
  onCountryChange: Updater
  title: ReactNode
}

export default function Countries({
  isLoading = false,
  excludedCountriesData,
  includedCountriesData,
  onCountryChange,
  title,
}: Props) {
  const countColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <VStack align="stretch">
      <Heading>
        {title}{' '}
        {!isLoading && (
          <Text as="span" color={countColor}>
            {includedCountriesData.length}
          </Text>
        )}
      </Heading>
      <Wrap>
        {isLoading &&
          [...Array(9).keys()].map(i => (
            <Skeleton key={i} borderRadius="full">
              <Tag inlineSize={`${10 + ((i * 3) % 7)}ch`} />
            </Skeleton>
          ))}
        {!isLoading &&
          includedCountriesData.map(({ id, flag, name }) => (
            <MotionWrapItem key={id} layout="position">
              <Tag size="lg" borderRadius="full">
                <TagLabel>
                  {flag} {name}
                </TagLabel>
                <TagCloseButton
                  onClick={() => onCountryChange({ action: 'remove', id })}
                />
              </Tag>
            </MotionWrapItem>
          ))}
        {!isLoading && excludedCountriesData.length > 0 && (
          <MotionWrapItem layout="position">
            <Select
              borderRadius="full"
              color="gray.500"
              icon={<SmallAddIcon />}
              iconColor={countColor}
              maxInlineSize="13ch"
              onChange={({ target }) =>
                onCountryChange({ action: 'add', id: target.value })
              }
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
