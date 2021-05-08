import { SmallAddIcon } from "@chakra-ui/icons";
import {
  Heading,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { countryCodeEmoji } from "country-code-emoji";
import { motion } from "framer-motion";

const MotionWrapItem = motion(WrapItem);

export default function CountryList({
  onCountryAdd,
  onCountryRemove,
  unvisitedCountriesData,
  visitedCountriesData,
}) {
  const countColor = useColorModeValue("gray.300", "gray.600");

  return (
    <VStack align="stretch">
      <Heading>
        Visited countries{" "}
        <Text as="i" color={countColor}>
          {visitedCountriesData.length}
        </Text>
      </Heading>
      <Wrap>
        {visitedCountriesData.map(({ id, name }) => (
          <MotionWrapItem key={id} layout="position">
            <Tag size="lg" borderRadius="full">
              <TagLabel>
                {countryCodeEmoji(id)} {name}
              </TagLabel>
              <TagCloseButton onClick={() => onCountryRemove(id)} />
            </Tag>
          </MotionWrapItem>
        ))}
        {unvisitedCountriesData.length > 0 && (
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
              {unvisitedCountriesData.map(({ id, name }) => (
                <option key={id} value={id}>
                  {countryCodeEmoji(id)} {name}
                </option>
              ))}
            </Select>
          </MotionWrapItem>
        )}
      </Wrap>
    </VStack>
  );
}
