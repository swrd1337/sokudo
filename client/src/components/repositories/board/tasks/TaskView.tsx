import { Button, HStack, VStack } from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import Task from '../../../../utilities/types/Task';
import AddNewEntry from '../common/AddNewEntry';
import TaskCard from './TaskCard';

type Props = {
  doneColumnName: string,
  currentColumnName: string
}

function TaskView({ doneColumnName, currentColumnName }: Props) {
  const [openAddTask, setOpenAddTask] = useState<boolean>(false);

  const tasks: Task[] = [{ id: 1, title: 'Task' }, { id: 2, title: 'Task somel ooollllnn asdass' }, { id: 3, title: 'Task' }];

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  const onSubmit = () => {

  };

  const handleAddTask = () => {
    setOpenAddTask(!openAddTask);
  };

  return (
    <HStack justifyContent="center" pt="0.5em">
      <VStack w="100%">
        {tasks.map((t: Task) => (
          <TaskCard key={t.id} task={t} />
        ))}
        {openAddTask && (
          <AddNewEntry
            onInputChange={onInputChange}
            onSubmit={onSubmit}
            onCancel={handleAddTask}
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

export default TaskView;
