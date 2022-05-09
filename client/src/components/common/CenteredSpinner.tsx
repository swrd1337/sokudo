import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

function CenteredSpinner() {
  return (
    <Box display="flex" w="100%" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  );
}

export default CenteredSpinner;
