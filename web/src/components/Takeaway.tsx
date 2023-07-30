import { Box, Center, Flex, Image, Link, Text } from '@chakra-ui/react';
import IngesterProvider from '../IngesterProvider';
import Colors from '../Colors';

export default function Takeaway({
  source,
  avatar,
  text,
}: {
  provider: IngesterProvider;
  source: string;
  avatar: string;
  text: string;
}) {
  console.log(source);
  let parse: { [key: string]: string } = {};
  try {
    parse = JSON.parse(source);
  } catch {
    //
  }
  const permalink = parse.permalink ?? 'https://www.google.com';
  const channel = parse.channel ?? '#general';
  return (
    <Flex
      bgColor={Colors.cardBackground}
      borderRadius="16px"
      pt="8px"
      pb="8px"
      pl="16px"
      pr="16px"
    >
      <Center boxSize="56px" mr="16px">
        <Image src={avatar} borderRadius="4px" />
      </Center>
      <Center>
        <Box>
          <Text fontWeight="600">
            <Link href={permalink} isExternal>
              {channel}
            </Link>
          </Text>
          <Text>{text}</Text>
        </Box>
      </Center>
    </Flex>
  );
}
