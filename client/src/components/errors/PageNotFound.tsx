import { Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ViewContainer from '../../ViewContainer';

function PageNotFound() {
  const location = useLocation();

  return (
    <ViewContainer fullH>
      <Stack alignItems="center" spacing={3}>
        <Heading>Page not found 😓</Heading>
        <Text color="gray.300" fontWeight="semibold">{location.pathname}</Text>
      </Stack>
    </ViewContainer>
  );
}

export default PageNotFound;
