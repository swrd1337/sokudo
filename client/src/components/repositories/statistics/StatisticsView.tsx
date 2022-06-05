import {
  Box, Heading, HStack, VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCommitsStatistics, fetchProjectStatistics } from '../../../api/statisticsApi';
import CommitsStatistics from '../../../utilities/types/statistics/CommitsStatistics';
import ProjectStatistics from '../../../utilities/types/statistics/ProjectStatistics';
import User from '../../../utilities/types/User';
import CenteredSpinner from '../../common/CenteredSpinner';
import BoardsDataCard from './cards/BoardsDataCard';
import CommitsByDateCard from './cards/CommitsByDateCard';
import CommitsByUserCard from './cards/CommitsByUserCard';
import MarkdownsDataCard from './cards/MarkdownsDataCard';

type Props = {
  user: User
}

function StatisticsView({ user }: Props) {
  const { owner, repo } = useParams();
  const [commitsStats, setCommitsStats] = useState<CommitsStatistics>();
  const [projectStats, setProjectStats] = useState<ProjectStatistics>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user && owner && repo) {
      const fetchStats = async () => {
        const { accessToken } = user;
        const commitsData = await fetchCommitsStatistics(owner, repo, accessToken);
        const projectData = await fetchProjectStatistics(owner, repo, accessToken);
        setCommitsStats(commitsData);
        setProjectStats(projectData);
        setLoading(false);
      };
      fetchStats();
    }
  }, []);

  return (
    <Box px={4} py={2} m={3} w="100%" overflow="auto">
      <Box display="flex" justifyContent="center" pb={4}>
        <Heading as="h4" size="md" color="purple.200">
          General Statistics
        </Heading>
      </Box>
      {loading ? (
        <CenteredSpinner />
      ) : (
        <VStack spacing={6}>
          <CommitsByDateCard commitsByDate={commitsStats!.byDate} />
          <BoardsDataCard boardStats={projectStats!.boardStats} />
          <HStack spacing={6} w="100%">
            <CommitsByUserCard commitsByUser={commitsStats!.byUser} />
            <MarkdownsDataCard mdsStats={projectStats!.mdsStats} />
          </HStack>
        </VStack>
      )}
    </Box>
  );
}

export default StatisticsView;
