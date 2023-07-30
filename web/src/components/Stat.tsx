import { Box, Center, Flex, Text } from "@chakra-ui/react";
import Provider from "../IngesterProvider";
import Colors from "../Colors";
import CircleIcon from "./CircleIcon";
import providerDisplay from "../lib/ingesterProviderDisplay";
export default function Stat({
  provider,
  number,
}: {
  provider: Provider;
  number: number;
}) {
  return (
    <Flex>
      <CircleIcon icon={providerDisplay[provider].icon} />
      <Center>
        <Box>
          <Text fontWeight="medium">{providerDisplay[provider].name}</Text>
          {provider !== Provider.NONE ? (
            <Text fontWeight="600">
              {number > 0 ? `${number} new` : "None"}
            </Text>
          ) : (
            <Text color={Colors.subtext}>
              {providerDisplay[provider].subtext}
            </Text>
          )}
        </Box>
      </Center>
    </Flex>
  );
}
