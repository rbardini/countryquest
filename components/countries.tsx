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
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import useCountries from '../hooks/use-countries'
import { CountriesRow, Query, Table } from '../lib/evolu'

const MotionWrapItem = motion(WrapItem)

type Props = {
  title: ReactNode
  table: Table
  query: Query<CountriesRow>
}

export default function Countries({ title, table, query }: Props) {
  const countColor = useColorModeValue('gray.300', 'gray.600')
  const {
    includedCountriesData,
    excludedCountriesData,
    onAddCountry,
    onRemoveCountry,
  } = useCountries(table, query)

  return (
    <VStack align="stretch">
      <Heading>
        {title}{' '}
        <Text as="span" color={countColor}>
          {includedCountriesData.length}
        </Text>
      </Heading>
      <Wrap>
        {includedCountriesData.map(({ id, flag, name }) => (
          <MotionWrapItem key={id} layout="position">
            <Tag size="lg" borderRadius="full">
              <TagLabel>
                {flag} {name}
              </TagLabel>
              <TagCloseButton onClick={() => onRemoveCountry(id)} />
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
              maxInlineSize="13ch"
              onChange={({ target }) => onAddCountry(target.value)}
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
