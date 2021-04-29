import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Heading,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { countryCodeEmoji } from "country-code-emoji";

export default function CountryList({
  onCountryAdd,
  onCountryRemove,
  unvisitedCountriesData,
  visitedCountriesData,
}) {
  return (
    <VStack align="stretch">
      <Heading>Visited countries</Heading>
      <Wrap>
        {visitedCountriesData.map(({ id, name }) => (
          <WrapItem key={id}>
            <Tag size="lg" borderRadius="full">
              <TagLabel>
                {countryCodeEmoji(id)} {name}
              </TagLabel>
              <TagCloseButton onClick={() => onCountryRemove(id)} />
            </Tag>
          </WrapItem>
        ))}
        {unvisitedCountriesData.length > 0 && (
          <WrapItem>
            <Select
              borderRadius="full"
              color="gray.500"
              icon={<SmallAddIcon />}
              iconColor="gray.300"
              maxWidth="13ch"
              onChange={({ target }) => onCountryAdd(target.value)}
              placeholder="Add country"
              size="sm"
              value=""
            >
              {unvisitedCountriesData.map(({ id, name }) => (
                <option key={id} value={id}>
                  {countryCodeEmoji(id)} {name}
                </option>
              ))}
            </Select>
          </WrapItem>
        )}
      </Wrap>
    </VStack>
  );
}
