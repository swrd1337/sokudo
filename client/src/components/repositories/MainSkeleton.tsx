import { SimpleGrid, Skeleton } from '@chakra-ui/react';
import React from 'react';

function MainSkeleton() {
  const range = (n: number) => [...Array(n).keys()];

  return (
    <SimpleGrid columns={3} spacing={20} w="90%">
      {range(9).map((v: number) => <Skeleton key={v} height="13em" />)}
    </SimpleGrid>
  );
}

export default MainSkeleton;
