import { EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Badge,
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
  useToast,
} from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchDeleteTask,
  fetchUpdateTask,
} from '../../../api/tasksApi';
import Validaton from '../../../constants/validationConstants';
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
  await fetchUpdateTask(newTask, accessToken);
};

function TaskDetails({ task, user, updateTask }: Props) {
  const navigate = useNavigate();
  const toast = useToast();

  const [titleValue, setTitleValue] = useState<string>(task.title);
  const [descValue, setDescValue] = useState<string>(task.description ?? 'No descritpion.');
  const [estValue, setEstValue] = useState<number>(task.storyPoints ?? 0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  useDebouncedEffect(() => {
    if (user && update) {
      const newTask = { ...task, storyPoints: estValue, description: descValue };
      fetchUpdate(newTask, user.accessToken);
      setUpdate(false);
    }
  }, [descValue, estValue], 1000);

  const onTitleChange = (value: string) => {
    if (value.length <= Validaton.TASK_TITLE_LENGTH) {
      setTitleValue(value);
    }
  };

  const onTitleConfirm = async () => {
    if (titleValue.length > 0 && titleValue.length <= Validaton.TASK_TITLE_LENGTH) {
      const newTask = { ...task, title: titleValue };
      updateTask(newTask);
      await fetchUpdateTask(newTask, user!.accessToken);
    } else {
      toast({
        title: 'Task title cannot be empty!',
        status: 'warning',
        position: 'bottom-right',
        duration: 5000,
        isClosable: true,
      });
      setTitleValue(task.title);
    }
  };

  const onDeleteTask = async () => {
    await fetchDeleteTask(task.id, user!.accessToken);
    navigate(-1);
  };

  const onTypeChange = (nextValue: string) => {
    const newTask = { ...task, type: nextValue as TaskTypes };
    updateTask(newTask);
    fetchUpdate(newTask, user!.accessToken);
  };

  const onEstimationChange = (asStr: string, asNum: number) => {
    if (asStr && asNum >= 0 && asNum <= 100) {
      setEstValue(asNum);
      setUpdate(true);
    }
  };

  const onDescriptionChange = (e: FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= Validaton.TASK_DESCRIPTION_LENGTH) {
      setDescValue(value);
      setUpdate(true);
    }
  };

  const onEditClick = () => {
    setEditMode(!editMode);
  };

  return (
    <HStack pb={4} w="100%">
      <Box
        display="flex"
        h="100%"
        w="100%"
        border="1px solid"
        borderColor="gray.600"
        bgColor="gray.700"
        borderRadius="lg"
      >
        <Stack flexGrow={1} padding="16px" overflow="auto">
          <Box
            justifyContent="space-between"
            display="flex"
            borderBottom="1px solid"
            borderColor="gray.600"
            pb={4}
          >
            <HStack spacing={5}>
              <Text fontWeight="semibold">Summary:</Text>
              <Editable
                value={titleValue}
                onChange={onTitleChange}
                onSubmit={onTitleConfirm}
                onCancel={onTitleConfirm}
                submitOnBlur={false}
                color="purple.200"
                fontWeight="semibold"
                fontSize="lg"
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </HStack>
            <TaskOptionsMenu onDelete={onDeleteTask} />
          </Box>
          <HStack spacing={5} pb="10px">
            <Text fontWeight="semibold">Created by:</Text>
            <Text fontWeight="bold" color="purple.300">
              {task.author}
            </Text>
          </HStack>
          <Box display="flex">
            <HStack spacing={5}>
              <Text fontWeight="semibold">Estimation:</Text>
              <NumberInput
                maxW={20}
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
            <RadioGroup p={3} defaultValue={task?.type} onChange={onTypeChange}>
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
          {/* SOMETHING GOOD - TO BE EXTRACTED AS MD COMPONENT */}
          <Stack h="100%">
            <HStack justifyContent="space-between">
              <Text fontWeight="semibold">Description:</Text>
              <IconButton
                aria-label="Edit/View description"
                icon={editMode ? <ViewIcon /> : <EditIcon />}
                onClick={onEditClick}
              />
            </HStack>
            <MarkdownComponent
              height="46vh"
              editMode={editMode}
              value={descValue}
              onChange={onDescriptionChange}
            />
          </Stack>
        </Stack>
      </Box>
      <Stack
        border="1px solid"
        borderColor="teal.600"
        bgColor="gray.800"
        borderRadius="md"
        h="100%"
        w="100%"
        overflow="auto"
      >
        <HStack spacing={1} justifyContent="center">
          <Text fontWeight="semibold" fontSize="xl" color="teal.300" p={3}>
            Comments
          </Text>
          <Badge
            colorScheme="purple"
            pl="10px"
            pr="10px"
            borderRadius="full"
            variant="outline"
          >
            {task.comments?.length}
          </Badge>
        </HStack>
        <CommentsContainer user={user} taskId={task.id} />
      </Stack>
    </HStack>
  );
}

export default TaskDetails;
