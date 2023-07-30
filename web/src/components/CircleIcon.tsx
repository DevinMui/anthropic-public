import { Center, Circle, Icon } from "@chakra-ui/react";
import Colors from "../Colors";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CircleIcon({ icon }: { icon: any }) {
  return (
    <Center mr="24px">
      <Circle bgColor={Colors.line} p="16px">
        <Icon boxSize="24px" as={icon} />
      </Circle>
    </Center>
  );
}
