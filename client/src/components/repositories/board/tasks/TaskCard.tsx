import {
  Box, Button, HStack, Text,
} from '@chakra-ui/react';
import React from 'react';
import Task from '../../../../utilities/types/Task';

type Props = {
  task: Task;
};

function TaskCard({ task }: Props) {
  return (
    <Box
      display="flex"
      w="100%"
      minH="3em"
      borderWidth="2px"
      borderRadius="lg"
      bgColor="whiteAlpha.50"
      boxShadow="inner"
      p="5px 10px"
      alignItems="center"
      draggable
    >
      <HStack w="100%" justifyContent="space-between" alignItems="end">
        <Text fontSize="xl">
          {task.title}
        </Text>
        <Button variant="link" size="sm" colorScheme="purple" marginRight="0.5rem">
          Open
        </Button>
      </HStack>
    </Box>
  );
}

export default TaskCard;
