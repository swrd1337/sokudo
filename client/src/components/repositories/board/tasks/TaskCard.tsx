import {
  Box, Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const onClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <Box
      display="flex"
      w="100%"
      minH={12}
      borderWidth="2px"
      borderRadius="lg"
      bgColor={dragMode ? 'whiteAlpha.300' : 'whiteAlpha.50'}
      boxShadow="inner"
      p="5px 10px"
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
      onClick={onClick}
    >
      <Text fontSize="md" overflowX="hidden">
        {task.title}
      </Text>
    </Box>
  );
}

export default TaskCard;
