import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

type Props = {
  message: string,
}

function NoAlertsMessage({ message }: Props) {
  return (
    <Box display="flex" justifyContent="center">
      <Heading as="h4" size="md" color="gray.400">
        {message}
      </Heading>
    </Box>
  );
}

export default NoAlertsMessage;
