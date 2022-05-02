import { Button, HStack, VStack } from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { fetchSaveRepositoryTask } from '../../../../api/tasksApi';
import Task from '../../../../utilities/types/Task';
import AddNewEntry from '../common/AddNewEntry';
import TaskActions from './TaskActions';
import TaskCard from './TaskCard';

type Props = {
  tasks: Task[],
  doneColumnName: string,
  currentColumnName: string,
  repoDataId: number,
  actions: TaskActions,
  accessToken: string,
  username: string
}

function TaskList({
  tasks, doneColumnName, currentColumnName, repoDataId, accessToken, username, actions,
}: Props) {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [invalidTitle, setInvalidTitle] = useState<boolean>(false);

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length < 64) {
      setNewTaskTitle(value);
    } else {
      setInvalidTitle(true);
    }
  };

  const onSubmit = async () => {
    if ((newTaskTitle && newTaskTitle.length < 64) && accessToken) {
      let newTask: Task = {
        id: -1,
        title: newTaskTitle,
        columnName: currentColumnName,
        repositoryDataId: repoDataId,
        author: username,
      };
      setOpenAddTask(!openAddTask);
      setInvalidTitle(false);
      newTask = await fetchSaveRepositoryTask(newTask, accessToken);
      actions.setTasks([...tasks, newTask]);
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
          <TaskCard key={t.id} task={t} actions={actions} />
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
