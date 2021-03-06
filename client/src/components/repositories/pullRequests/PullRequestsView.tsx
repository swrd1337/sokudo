import {
  Box, Divider, Heading, useDisclosure, VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPullRequests } from '../../../api/repositoriesApi';
import useCreateTask from '../../../hooks/useCreateTask';
import Board from '../../../utilities/types/Board';
import PullRequest from '../../../utilities/types/PullRequest';
import User from '../../../utilities/types/User';
import CenteredSpinner from '../../common/CenteredSpinner';
import NoItemsMessage from '../../common/NoItemsMessage';
import CreateTaskConfirmation from '../../modals/CreateTaskConfirmation';
import PullRequestCard from './PullRequestCard';

type Props = {
  board: Board
  user: User
}

function PullRequestsView({ board, user }: Props) {
  const { id, boardColumns } = board;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { owner, repo } = useParams();
  const [pullRequests, setPullRequests] = useState<PullRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const createTaskHandler = useCreateTask(id, boardColumns, user);

  const [newTask, setNewTask] = useState<{
    title: string,
    desc: string,
  }>();

  useEffect(() => {
    if (user && owner && repo) {
      const fetchPRs = async () => {
        const data = await fetchPullRequests(owner, repo, user.accessToken);
        setPullRequests(data);
        setLoading(false);
      };
      fetchPRs();
    }
  }, []);

  let component = <NoItemsMessage message="No pull requests... 👍" />;

  if (loading) {
    component = <CenteredSpinner />;
  }

  if (pullRequests.length) {
    component = (
      <VStack spacing={5} p={4}>
        {pullRequests.map((pr) => (
          <PullRequestCard
            key={pr.mergeCommitSha}
            pullRequest={pr}
            onCreate={(title, desc) => {
              onOpen();
              setNewTask({ title, desc });
            }}
          />
        ))}
      </VStack>
    );
  }

  return (
    <Box
      px={4}
      py={2}
      m={3}
      bgColor="gray.700"
      border="2px solid"
      borderColor="gray.600"
      borderRadius="lg"
      w="100%"
      overflow="auto"
    >
      <Box display="flex" justifyContent="center" pb={4}>
        <Heading as="h4" size="md" color="purple.200">Latest pull requests</Heading>
      </Box>
      <Divider />
      {component}
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

export default PullRequestsView;
