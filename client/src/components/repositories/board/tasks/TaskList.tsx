import { Button, HStack, VStack } from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { fetchSaveTask } from '../../../../api/tasksApi';
import Validaton from '../../../../constants/validationConstants';
import Task from '../../../../utilities/types/Task';
import AddNewEntry from '../common/AddNewEntry';
import TaskActions from './TaskActions';
import TaskCard from './TaskCard';

type Props = {
  tasks: Task[],
  doneColumnName: string,
  currentColumnName: string,
  boardId: number,
  actions: TaskActions,
  accessToken: string,
  username: string
}

function TaskList({
  tasks, doneColumnName, currentColumnName, boardId, accessToken, username, actions,
}: Props) {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [invalidTitle, setInvalidTitle] = useState<boolean>(false);

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= Validaton.TASK_TITLE_LENGTH) {
      setNewTaskTitle(value);
    } else {
      setInvalidTitle(true);
    }
  };

  const onSubmit = async () => {
    if ((newTaskTitle && newTaskTitle.length <= Validaton.TASK_TITLE_LENGTH) && accessToken) {
      let newTask: Task = {
        id: -1,
        title: newTaskTitle,
        columnName: currentColumnName,
        author: username,
        boardId,
      };
      newTask = await fetchSaveTask(newTask, accessToken);
      actions.setTasks([...tasks, newTask]);
      setOpenAddTask(!openAddTask);
      setNewTaskTitle('');
      setInvalidTitle(false);
    } else {
      setInvalidTitle(true);
    }
  };

  const handleAddTask = () => {
    setOpenAddTask(!openAddTask);
    setInvalidTitle(false);
  };

  return (
    <HStack justifyContent="center" pt={2}>
      <VStack w="100%">
        {tasks?.filter((t) => t.columnName === currentColumnName).map((t) => (
          <TaskCard key={`task-${t.id}`} task={t} actions={actions} />
        ))}
        {openAddTask && (
          <AddNewEntry
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onCancel={handleAddTask}
            isInvalid={invalidTitle}
            value={newTaskTitle}
            width="100%"
          />
        )}
        {(doneColumnName !== currentColumnName) && !openAddTask && (
          <Button variant="ghost" colorScheme="purple" onClick={handleAddTask}>
            Add Task
          </Button>
        )}
      </VStack>
    </HStack>
  );
}

export default TaskList;
