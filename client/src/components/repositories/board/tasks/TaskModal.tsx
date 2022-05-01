import {
  Box,
  Editable,
  EditableInput,
  EditablePreview, HStack, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import React, { useContext, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  fetchDeleteRepositoryTask,
  fetchUpdateRepositoryTask
} from '../../../../api/tasksApi';
import TasksContext from '../../../../context/TaskTasksContext';
import UserContext from '../../../../context/UserContext';
import useDebouncedEffect from '../../../../utilities/debounce';
import { getTypeColor } from '../../../../utilities/taskTypes';
import Task from '../../../../utilities/types/Task';
import TaskTypes from '../../../../utilities/types/TaskTypes';
import TaskOptionsMenu from './TaskOptionsMenu';

type Props = {
  task: Task;
  isOpen: boolean;
  onClose(): void;
};

const fetchUpdate = async (newTask: Task, accessToken: string) => {
  await fetchUpdateRepositoryTask(newTask, accessToken);
};

function TaskModal({ task, isOpen, onClose }: Props) {
  const { triggerUpdate } = useContext(TasksContext);
  const { user } = useContext(UserContext);

  const [descValue, setDescValue] = useState<string>(task.description ?? '123');
  const [estValue, setEstValue] = useState<number>(task.storyPoints ?? 0);

  useDebouncedEffect(() => {
    if (isOpen && user) {
      const newTask = { ...task, storyPoints: estValue, description: descValue };
      fetchUpdate(newTask, user.accessToken);
    }
  }, [descValue, estValue], 1000);

  const onTitleConfirm = async (newTitle: string) => {
    if (newTitle.length <= 64 && newTitle !== task.title) {
      const newTasks = { ...task, title: newTitle };
      await fetchUpdateRepositoryTask(newTasks, user!.accessToken);
    }
  };

  const onDeleteTask = async () => {
    await fetchDeleteRepositoryTask(task.id, user!.accessToken);
    triggerUpdate(true);
    onClose();
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

  const onDescriptionChange = (e: any) => {
    const { value } = e.target;
    if (value.length < 1024) {
      setDescValue(value);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        triggerUpdate(true);
        onClose();
      }}
      size="6xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent border="2px solid" borderColor="gray.600">
        <ModalHeader
          color="purple.300"
          borderBottom="1px solid"
          borderColor="gray.600"
          fontSize="2xl"
        >
          <Editable
            w="80%"
            defaultValue={task.title}
            onSubmit={onTitleConfirm}
            onCancel={onTitleConfirm}
          >
            <EditablePreview />
            <EditableInput />
          </Editable>
        </ModalHeader>
        <ModalCloseButton color="purple.300" />
        <ModalBody pt="1em" pb="2em">
          <Stack spacing={6}>
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
              </HStack>
              <TaskOptionsMenu onDelete={onDeleteTask} />
            </Box>
            <HStack spacing={5}>
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
            <Stack spacing={5}>
              <Text fontWeight="semibold">Description:</Text>
              <Box display="flex" h="30em"> 
                <Textarea
                  resize="none"
                  onChange={onDescriptionChange}
                  defaultValue={descValue}
                  minW="40%"
                  maxW="40%"
                  h="30em"
                  mr="1em"
                />
                <Box overflow="auto">
                  <ReactMarkdown components={ChakraUIRenderer()}>
                    {descValue}
                  </ReactMarkdown>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default TaskModal;
