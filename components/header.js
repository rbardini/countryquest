import { Badge, Button, Flex, Heading, useToken } from "@chakra-ui/react";

export default function Header() {
  const [purple500, pink500] = useToken("colors", ["purple.500", "pink.500"]);

  return (
    <Flex
      alignItems="center"
      backgroundColor="gray.50"
      flexDirection="row"
      justifyContent="space-between"
      padding={8}
    >
      <Heading
        as="h1"
        bgClip="text"
        bgGradient={`linear(to-l, ${purple500}, ${pink500})`}
      >
        Countryquest{" "}
        <Badge colorScheme="purple" variant="solid" verticalAlign="super">
          beta
        </Badge>
      </Heading>
      {false && (
        <Button colorScheme="blue" variant="outline">
          Sign in
        </Button>
      )}
    </Flex>
  );
}
