import { Heading, Tag, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { countryCodeEmoji } from "country-code-emoji";

export default function CountryList({ countriesData }) {
  return (
    <VStack align="stretch">
      <Heading>Countries</Heading>
      <Wrap>
        {countriesData.map(({ id, name }) => (
          <WrapItem key={id}>
            <Tag size="lg" borderRadius="full">
              {countryCodeEmoji(id)} {name}
            </Tag>
          </WrapItem>
        ))}
      </Wrap>
    </VStack>
  );
}
