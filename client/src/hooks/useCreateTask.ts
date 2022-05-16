import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { fetchSaveTask } from '../api/tasksApi';
import Task from '../utilities/types/Task';
import User from '../utilities/types/User';

function useCreateTask(boardId: number, boardColumns: Set<string>, user: User) {
  const navigate = useNavigate();
  const toast = useToast();

  const createTaskHandler = async (title: string, description: string) => {
    if (user) {
      const columnName = [...boardColumns][0];
      let newTask: Task = {
        id: -1,
        boardId,
        columnName,
        title,
        description,
        author: user.username,
      };
      newTask = await fetchSaveTask(newTask, user.accessToken);
      navigate(`/tasks/${newTask.id}`);
      toast({
        title: 'Task created!',
        description: `The given column: ${columnName}`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return createTaskHandler;
}

export default useCreateTask;
