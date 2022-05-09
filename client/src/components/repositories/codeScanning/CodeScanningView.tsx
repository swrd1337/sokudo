import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSaveTask } from '../../../api/tasksApi';
import Board from '../../../utilities/types/Board';
import Task from '../../../utilities/types/Task';
import User from '../../../utilities/types/User';
import DependabotPanel from './dependabot/DependabotPanel';
import ScanningAlertsPanel from './scanningAllerts/ScanningAlertsPanel';

type Props = {
  board: Board
  user: User
}

function CodeScanningView({ board, user }: Props) {
  const { id, boardColumns } = board;
  const navigate = useNavigate();

  const toast = useToast();

  const createTaskHandler = async (title: string, description: string) => {
    if (user) {
      const boardColumnName = [...boardColumns][0];
      let newTask: Task = {
        id: -1,
        boardId: id,
        columnName: boardColumnName,
        title,
        description,
        author: user.username,
      };
      newTask = await fetchSaveTask(newTask, user.accessToken);
      navigate(`/tasks/${newTask.id}`);
      toast({
        title: 'Task created!',
        description: `The given column: ${boardColumnName}`,
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box w="100%" flexGrow={1} display="flex" justifyContent="center" p={3}>
      <Accordion w="100%" defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="center" fontWeight="semibold" color="cyan.200" fontSize="lg">
              Scanning alerts
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel py={4} my={2} bgColor="gray.700" border="2px solid" borderColor="gray.600" borderRadius="lg">
            <ScanningAlertsPanel user={user} createTaskHandler={createTaskHandler} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="center" fontWeight="semibold" color="purple.200" fontSize="lg">
                Dependabot Alerts
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel py={4} my={2} bgColor="gray.700" border="2px solid" borderColor="gray.600" borderRadius="lg">
            <DependabotPanel user={user} createTaskHandler={createTaskHandler} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

export default CodeScanningView;
