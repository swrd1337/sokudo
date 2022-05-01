import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Skeleton,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRepositoryTask } from '../../../api/tasksApi';
import UserContext from '../../../context/UserContext';
import { getTypeColor } from '../../../utilities/taskTypes';
import Task from '../../../utilities/types/Task';
import ViewContainer from '../../../ViewContainer';
import TaskDetails from './TaskDetails';

function TaskView() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { user } = useContext(UserContext);
  const [task, setTask] = useState<Task>();

  useEffect(() => {
    if (user && taskId) {
      const fetchTask = async () => {
        const data = await fetchRepositoryTask(+taskId, user.accessToken);
        setTask(data);
      };
      fetchTask();
    }
  }, [user]);

  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <ViewContainer fullH>
      <Container maxW="100%" h="100%" display="flex" flexDirection="column">
        <HStack pb="5" justifyContent="space-between">
          {/* Extract into component */}
          <HStack flexGrow={1}>
            <IconButton
              aria-label="Back to all"
              icon={<ArrowLeftIcon color="gray.500" />}
              size="sm"
              onClick={onBackClick}
            />
            <HStack flexGrow={1} justifyContent="space-between">
              <Skeleton isLoaded={!!task} h="2em" minW="10em">
                <HStack>
                  <Heading as="h4" size="md" color="purple.300">
                    Task title:
                  </Heading>
                  <Heading as="h4" size="md">
                    {task?.title}
                  </Heading>
                </HStack>
              </Skeleton>
              <Skeleton isLoaded={!!task} h="2em" minW="5em">
                <HStack>
                  <Badge colorScheme={getTypeColor(task?.type as string)} fontSize="md">
                    {task?.type}
                  </Badge>
                </HStack>
              </Skeleton>
            </HStack>
          </HStack>
        </HStack>
        <Skeleton isLoaded={!!task} h="100%">
          { user && task && (
            <Box display="flex" justifyContent="center">
              <TaskDetails user={user} task={task} updateTask={setTask} />
            </Box>
          )}
        </Skeleton>
      </Container>
    </ViewContainer>
  );
}

export default TaskView;