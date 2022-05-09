import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDependabotAlerts } from '../../../../api/repositoriesApi';
import DependabotNode from '../../../../utilities/types/security/DependabotNode';
import DependabotResult from '../../../../utilities/types/security/DependabotResult';
import User from '../../../../utilities/types/User';
import CenteredSpinner from '../../../common/CenteredSpinner';
import NoAlertsMessage from '../NoAlertsMessage';
import AlertCard from './AlertCard';

const INITIAL_COUNT = 9;

type Props = {
  user: User,
  createTaskHandler(_t: string, _d: string): void,
}

function DependabotPanel({ user, createTaskHandler }: Props) {
  const { owner, repo } = useParams();

  const [dependabotNodes, setNodes] = useState<DependabotNode[]>([]);
  const [count, setCount] = useState<number>(INITIAL_COUNT);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(INITIAL_COUNT);
  const [noItems, setNoItems] = useState<boolean>(false);

  useEffect(() => {
    if (user && owner && repo) {
      const fetchAllerts = async () => {
        const response: DependabotResult = await fetchDependabotAlerts(
          owner,
          repo,
          count,
          user.accessToken,
        );
        const alerts = response.data.repository.vulnerabilityAlerts;
        if (alerts) {
          setTotal(alerts.totalCount);
          setNodes(alerts.nodes);
        } else {
          setNoItems(true);
        }
        setLoading(false);
      };
      fetchAllerts();
    }
  }, [count]);

  const onMoreHandler = () => {
    setCount(INITIAL_COUNT + count);
    setLoading(true);
  };

  if (noItems) {
    return <NoAlertsMessage message="Empty... 😓" />;
  }

  return (
    <>
      <SimpleGrid
        columns={{
          sm: 1,
          lg: 2,
          '2xl': 3,
        }}
        gap={10}
        justifyItems="center"
      >
        {dependabotNodes.map((item) => (
          <AlertCard key={item.number} item={item} onCreate={createTaskHandler} />
        ))}
      </SimpleGrid>

      { loading ? (
        <CenteredSpinner />
      ) : (
        <Box display="flex" justifyContent="center">
          {count < total && (
            <Button
              mt={5}
              onClick={onMoreHandler}
              variant="ghost"
              color="gray.500"
              borderRadius="full"
            >
              More
            </Button>
          )}
        </Box>
      )}
    </>
  );
}

export default DependabotPanel;
