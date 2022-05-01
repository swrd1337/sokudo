import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview, HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchDeleteRepositoryTask,
  fetchUpdateRepositoryTask,
} from '../../../api/tasksApi';
import useDebouncedEffect from '../../../utilities/debounce';
import { getTypeColor } from '../../../utilities/taskTypes';
import Task from '../../../utilities/types/Task';
import TaskTypes from '../../../utilities/types/TaskTypes';
import User from '../../../utilities/types/User';
import MarkdownComponent from '../../markdown/MarkdownComponent';
import CommentsContainer from './comments/CommentsContainer';
import TaskOptionsMenu from './TaskOptionsMenu';

type Props = {
  task: Task;
  user: User,
  updateTask(_val: Task): void,
};

const fetchUpdate = async (newTask: Task, accessToken: string) => {
  await fetchUpdateRepositoryTask(newTask, accessToken);
};

function TaskDetails({ task, user, updateTask }: Props) {
  const navigate = useNavigate();

  const [descValue, setDescValue] = useState<string>(task.description ?? 'No descritpion.');
  const [estValue, setEstValue] = useState<number>(task.storyPoints ?? 0);
  const [editMode, setEditMode] = useState<boolean>(false);

  useDebouncedEffect(() => {
    if (user) {
      const newTask = { ...task, storyPoints: estValue, description: descValue };
      fetchUpdate(newTask, user.accessToken);
    }
  }, [descValue, estValue], 1000);

  const onTitleConfirm = async (newTitle: string) => {
    if (newTitle.length <= 64 && newTitle !== task.title) {
      const newTask = { ...task, title: newTitle };
      updateTask(newTask);
      await fetchUpdateRepositoryTask(newTask, user!.accessToken);
    }
  };

  const onDeleteTask = async () => {
    await fetchDeleteRepositoryTask(task.id, user!.accessToken);
    navigate(-1);
  };

  const onTypeChange = (nextValue: string) => {
    const newTask = { ...task, type: nextValue as TaskTypes };
    fetchUpdate(newTask, user!.accessToken);
  };

  const onEstimationChange = (asStr: string, asNum: number) => {
    if (asStr && asNum >= 0 && asNum <= 100) {
      setEstValue(asNum);
    }
  };

  const onDescriptionChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value.length < 1024) {
      setDescValue(value);
    }
  };

  const onEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <Box
      display="flex"
      w="6xl"
      border="1px solid"
      borderColor="gray.600"
      bgColor="gray.700"
      borderRadius="lg"
      mb="1em"
    >
      <Stack spacing={6} flexGrow={1} padding="2em">
        <Box
          justifyContent="space-between"
          display="flex"
          borderBottom="1px solid"
          borderColor="gray.600"
          pb="1em"
        >
          <HStack spacing={5}>
            <Text fontWeight="semibold">Summary:</Text>
            <Editable
              defaultValue={task.title}
              onSubmit={onTitleConfirm}
              onCancel={onTitleConfirm}
              color="purple.300"
              fontSize="2xl"
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
          </HStack>
          <TaskOptionsMenu onDelete={onDeleteTask} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <HStack spacing={5}>
            <Text fontWeight="semibold">Estimation:</Text>
            <NumberInput
              maxW="5em"
              value={estValue}
              min={0}
              max={100}
              onChange={onEstimationChange}
              allowMouseWheel
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontWeight="semibold">Story Points</Text>
          </HStack>
        </Box>
        <HStack spacing={5} borderBottom="1px solid" borderColor="gray.600">
          <Text fontWeight="semibold">Type:</Text>
          <RadioGroup
            p="0.8em"
            defaultValue={task?.type}
            onChange={onTypeChange}
          >
            <Stack spacing={5} direction="row" flexWrap="wrap">
              {Object.values(TaskTypes).map((type) => {
                const color = getTypeColor(type);
                return (
                  <Radio key={type} colorScheme={color} value={type}>
                    <Text color={`${color}.200`} fontWeight="semibold">
                      {type}
                    </Text>
                  </Radio>
                );
              })}
            </Stack>
          </RadioGroup>
        </HStack>
        {/* SOMETHING GOOD TO BE EXTRACTED AS MD COMPONENT */}
        <Stack spacing={5} borderBottom="1px solid" borderColor="gray.600" pb="1em">
          <HStack justifyContent="space-between">
            <Text fontWeight="semibold">Description:</Text>
            <IconButton
              aria-label="Edit/View description"
              icon={editMode ? <ViewIcon /> : <EditIcon />}
              onClick={onEditClick}
            />
          </HStack>
          <MarkdownComponent height="20em" editMode={editMode} value={descValue} onChange={onDescriptionChange} />
        </Stack>
        <Stack border="1px solid" borderColor="teal.600" bgColor="gray.800" pb="2em" borderRadius="1em">
          <HStack spacing={5} justifyContent="center">
            <Text fontWeight="semibold" fontSize="xl" color="teal.300" p="1em">Comments</Text>
          </HStack>
          <CommentsContainer user={user} taskId={task.id} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default TaskDetails;