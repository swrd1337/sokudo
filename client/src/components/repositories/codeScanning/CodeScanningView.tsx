import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import useCreateTask from '../../../hooks/useCreateTask';
import Board from '../../../utilities/types/Board';
import User from '../../../utilities/types/User';
import DependabotPanel from './dependabot/DependabotPanel';
import ScanningAlertsPanel from './scanningAllerts/ScanningAlertsPanel';

type Props = {
  board: Board
  user: User
}

function CodeScanningView({ board, user }: Props) {
  const { id, boardColumns } = board;

  const createTaskHandler = useCreateTask(id, boardColumns, user);

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
