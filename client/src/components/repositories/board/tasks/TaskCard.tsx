import {
  Badge, Box, HStack, Text, Tooltip, VStack,
} from '@chakra-ui/react';
import React, { KeyboardEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTypeColor } from '../../../../utilities/taskTypes';
import Task from '../../../../utilities/types/Task';
import TaskActions from './TaskActions';

type Props = {
  task: Task,
  actions: TaskActions,
};

function TaskCard({ task, actions }: Props) {
  const navigate = useNavigate();
  const [dragMode, setDragMode] = useState<boolean>(false);

  const onDragEnd = () => {
    setDragMode(false);
    actions.onDragEndHandler(task);
  };

  const onDragStart = () => {
    setDragMode(true);
    actions.onDragStart(-1, true);
  };

  const onCardInteraction = () => navigate(`/tasks/${task.id}`);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onCardInteraction();
    }
  };

  const {
    type, author, comments, title,
  } = task;

  return (
    <Box
      display="flex"
      w="100%"
      minH={12}
      borderWidth="2px"
      borderRadius="lg"
      bgColor={dragMode ? 'whiteAlpha.300' : 'whiteAlpha.50'}
      boxShadow="inner"
      alignItems="center"
      draggable
      _hover={{
        borderColor: 'purple.300',
        cursor: 'pointer',
      }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      aria-label="Task"
      tabIndex={0}
      _focus={{
        boxShadow: 'outline',
      }}
      _focusVisible={{
        outline: 'none',
      }}
      onKeyDown={onKeyDown}
      onClick={onCardInteraction}
    >
      <Tooltip color="whiteAlpha.900" bg={`${getTypeColor(type!)}.500`} label={type} borderRadius="lg" placement="right" hasArrow>
        <VStack alignItems="start" w="100%">
          <Box p={2} pb={0}>
            <Text fontSize="lg" fontWeight="semibold" overflowX="hidden">
              {title}
            </Text>
          </Box>
          <HStack justify="space-between" w="100%" p={2} borderTop="1px solid" borderColor="whiteAlpha.300">
            <Text color="purple.300" fontWeight="semibold">{author}</Text>
            {comments?.length && (
              <Badge colorScheme="green" px={2} borderRadius="full">
                {`${comments.length} comments`}
              </Badge>
            )}
          </HStack>
        </VStack>
      </Tooltip>
    </Box>
  );
}

export default TaskCard;
