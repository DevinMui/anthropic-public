import { Center, Flex, Heading, Icon } from "@chakra-ui/react";
import IntegrationProvider from "../IntegrationProvider";
import integrationProviderDisplay from "../lib/integrationProviderDisplay";
import Colors from "../Colors";

export default function Action({
  provider,
  onClick,
}: {
  provider: IntegrationProvider;
  onClick?: () => void | null | undefined;
}) {
  return (
    <Flex
      as="button"
      pt="4px"
      pb="4px"
      pl="12px"
      pr="12px"
      mr="8px"
      borderColor={Colors.text}
      borderWidth="1px"
      borderRadius="32px"
      onClick={onClick}
    >
      <Center mr="8px">
        <Icon as={integrationProviderDisplay[provider].icon} />
      </Center>
      <Center>
        <Heading size="sm">
          {integrationProviderDisplay[provider].title}
        </Heading>
      </Center>
    </Flex>
  );
}
