import {
  Box,
  Center,
  ChakraProvider,
  Divider,
  Flex,
  Heading,
  Text,
  extendTheme,
  useToast,
} from '@chakra-ui/react';
import {
  ApolloClient,
  SuspenseCache,
  InMemoryCache,
  ApolloProvider,
  useBackgroundQuery,
  QueryReference,
  useReadQuery,
  useMutation,
} from '@apollo/client';
import './App.css';
import Stat from './components/Stat';
import IngesterProvider from './IngesterProvider';
import Colors from './Colors';
import ActionItem from './components/ActionItem';
import IntegrationProvider from './IntegrationProvider';
import Takeaway from './components/Takeaway';
import Loader from './components/Loader';
import { gql } from './__generated__/gql';
import { GetOverviewQuery } from './__generated__/graphql';
import React from 'react';

const suspenseCache = new SuspenseCache();
const client = new ApolloClient({
  uri: 'https://dolphin-app-xqueq.ondigitalocean.app/graphql',
  cache: new InMemoryCache(),
});

const GET_OVERVIEW = gql(`#graphql
query GetOverview {
  overview {
    integrations {
      id
      provider
      label
      citation
      completed_at
      ingester_item {
        provider
        message
        link
        metadata
      }
    }
    summaries {
      provider
      message
      citation
    }
    notifications {
      number
      provider
    }
  }
}
`);

const CALL_ACTION = gql(`#graphql
mutation CallAction($input: CallActionInput!) {
  callAction(input: $input) {
    content
  }
}
`);

const ingesterProviderResponseToEnum: { [key: string]: IngesterProvider } = {
  slack: IngesterProvider.SLACK,
  email: IngesterProvider.EMAIL,
};

function App() {
  const [queryRef] = useBackgroundQuery(GET_OVERVIEW);
  return (
    <Loader>
      <Content queryRef={queryRef} />
    </Loader>
  );
}

function Content({ queryRef }: { queryRef: QueryReference<GetOverviewQuery> }) {
  const toast = useToast();
  const { data } = useReadQuery(queryRef);
  const [callAction] = useMutation(CALL_ACTION);
  const { integrations, notifications, summaries } = data.overview;

  async function onAction(
    action: IntegrationProvider,
    label: string,
    id: string
  ) {
    toast({
      title: 'Creating a Claude2 response...',
      description:
        "We're creating a personalized Claude2 response to complete the action.",
      status: 'info',
      isClosable: true,
    });
    try {
      const { data } = await callAction({
        variables: {
          input: {
            provider: IntegrationProvider[action],
            label,
            integration_item_id: id,
          },
        },
      });
      if (action === IntegrationProvider.EMAIL) {
        const link = `mailto:?to=&body=${data?.callAction.content}`;
        window.open(link, '_blank');
      }
      toast({
        title: 'Successfully executed the action',
        description: 'Claude2 has created a custom response for you!',
        status: 'success',
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
      toast({
        title: 'Error executing the Claude2 response',
        description:
          "We're having trouble generating a custom response. Please try again in a moment.",
        status: 'error',
        isClosable: true,
      });
    }
  }

  return (
    <Center>
      {/* <Button
        onClick={() =>
          onAction(IntegrationProvider.EMAIL, 'Create a task', '0')
        }
      >
        hi
      </Button> */}
      <Box w="1280px" pt="40px">
        <Heading size="md">Overview</Heading>
        <Text color={Colors.subtext}>
          See what you might’ve missed from your channels.
        </Text>
        <Divider mt="32px" />
        <Flex pt="24px" pb="24px" h="100px">
          {notifications.map((notification, i) => (
            <React.Fragment key={i.toString()}>
              <Stat
                provider={ingesterProviderResponseToEnum[notification.provider]}
                number={notification.number}
              />
              <Divider orientation="vertical" ml="24px" mr="24px" />
            </React.Fragment>
          ))}
          <Stat provider={IngesterProvider.NONE} number={-1} />
        </Flex>
        <Divider mb="32px" />

        <Heading size="md">Action Items ({integrations.length})</Heading>
        <Text color={Colors.subtext} mb="24px">
          We flagged these action items.
        </Text>
        {integrations.map((item) => (
          <ActionItem
            key={item.id}
            title={item.label}
            provider={
              ingesterProviderResponseToEnum[item.provider] ??
              IngesterProvider.NONE
            }
            actions={[IntegrationProvider.EMAIL, IntegrationProvider.ASANA]}
            onClick={(action) => onAction(action, item.label, item.id)}
          />
        ))}

        <Heading size="md" mt="40px">
          Takeaways ({summaries.length})
        </Heading>
        <Text color={Colors.subtext} mb="24px">
          Important information that surfaced in your connections.
        </Text>

        {summaries.map((item, i) => (
          <Takeaway
            key={i.toString()}
            provider={ingesterProviderResponseToEnum[item.provider]}
            source={item.citation}
            avatar="https://bit.ly/dan-abramov"
            text={item.message}
          />
        ))}
      </Box>
    </Center>
  );
}

const theme = extendTheme({
  fonts: {
    body: "'Poppins', sans-serif",
    heading: "'Poppins', sans-serif",
  },
});

function Provider() {
  return (
    <ApolloProvider client={client} suspenseCache={suspenseCache}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default Provider;
