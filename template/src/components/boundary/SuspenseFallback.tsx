import { ActivityIndicator, Flex } from '../kit';

export function SuspenseFallback() {
  return (
    <Flex justify="center" align="center">
      <ActivityIndicator size={50} />
    </Flex>
  );
}
