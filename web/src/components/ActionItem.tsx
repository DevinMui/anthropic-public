import { Box, Center, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import IngesterProvider from '../IngesterProvider';
import CircleIcon from './CircleIcon';
import providerDisplay from '../lib/ingesterProviderDisplay';
import { FiMoreHorizontal } from 'react-icons/fi';
import IntegrationProvider from '../IntegrationProvider';
import Action from './Action';

export default function ActionItem({
  title,
  provider,
  actions,
  onClick,
}: {
  title: string;
  provider: IngesterProvider;
  actions: IntegrationProvider[];
  onClick?: (action: IntegrationProvider) => void;
}) {
  return (
    <Flex w="100%" mb="16px">
      <CircleIcon icon={providerDisplay[provider].icon} />
      <Center>
        <Box>
          <Text fontWeight="600">{title}</Text>
          <Flex>
            {actions.map((action, i) => (
              <Action
                key={i.toString()}
                provider={action}
                onClick={() => onClick && onClick(action)}
              />
            ))}
          </Flex>
        </Box>
      </Center>
      <Spacer />
      <Center justifySelf="flex-end">
        <Icon as={FiMoreHorizontal} />
      </Center>
    </Flex>
  );
}
