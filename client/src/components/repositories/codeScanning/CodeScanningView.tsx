import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useCreateTask from '../../../hooks/useCreateTask';
import Board from '../../../utilities/types/Board';
import User from '../../../utilities/types/User';
import CreateTaskConfirmation from '../../modals/CreateTaskConfirmation';
import DependabotPanel from './dependabot/DependabotPanel';
import ScanningAlertsPanel from './scanningAllerts/ScanningAlertsPanel';

type Props = {
  board: Board
  user: User
}

function CodeScanningView({ board, user }: Props) {
  const { id, boardColumns } = board;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newTask, setNewTask] = useState<{
    title: string,
    desc: string,
  }>();

  const createTaskHandler = useCreateTask(id, boardColumns, user);

  const onCreate = (title: string, desc: string) => {
    onOpen();
    setNewTask({ title, desc });
  };

  return (
    <Box w="100%" flexGrow={1} display="flex" justifyContent="center" p={3}>
      <Accordion w="100%" defaultIndex={[0]}>
        <AccordionItem>
          <AccordionButton>
            <Box
              flex="1"
              textAlign="center"
              fontWeight="semibold"
              color="cyan.200"
              fontSize="lg"
            >
              Scanning alerts
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel
            py={4}
            my={2}
            bgColor="gray.700"
            border="2px solid"
            borderColor="gray.600"
            borderRadius="lg"
          >
            <ScanningAlertsPanel
              user={user}
              createTaskHandler={onCreate}
            />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box
                flex="1"
                textAlign="center"
                fontWeight="semibold"
                color="purple.200"
                fontSize="lg"
              >
                Dependabot Alerts
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            py={4}
            my={2}
            bgColor="gray.700"
            border="2px solid"
            borderColor="gray.600"
            borderRadius="lg"
          >
            <DependabotPanel
              user={user}
              createTaskHandler={onCreate}
            />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      <CreateTaskConfirmation
        isOpen={isOpen}
        onClose={() => {
          setNewTask(undefined);
          onClose();
        }}
        onConfirmClick={() => {
          onClose();
          if (newTask) {
            const { title, desc } = newTask;
            createTaskHandler(title, desc);
          }
        }}
      />
    </Box>
  );
}

export default CodeScanningView;
