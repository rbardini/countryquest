import {
  Heading,
  Tag,
  TagCloseButton,
  TagLabel,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { countryCodeEmoji } from "country-code-emoji";

export default function CountryList({ countriesData, onCountryClick }) {
  return (
    <VStack align="stretch">
      <Heading>Countries</Heading>
      <Wrap>
        {countriesData.map(({ id, name }) => (
          <WrapItem key={id}>
            <Tag size="lg" borderRadius="full">
              <TagLabel>
                {countryCodeEmoji(id)} {name}
              </TagLabel>
              <TagCloseButton onClick={() => onCountryClick(id)} />
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
}
