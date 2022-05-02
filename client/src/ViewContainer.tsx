import { Center } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode,
  fullH?: boolean
}

function ViewContainer({ children, fullH }: Props) {
  return (
    <Center pt={4} flexDirection="column" h={fullH ? '100%' : 'auto'}>
      {children}
    </Center>
  );
}

ViewContainer.defaultProps = {
  fullH: false,
};

export default ViewContainer;
