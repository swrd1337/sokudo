import { SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDependabotAlerts } from '../../../../api/repositoriesApi';
import DependabotNode from '../../../../utilities/types/security/DependabotNode';
import DependabotResult from '../../../../utilities/types/security/DependabotResult';
import User from '../../../../utilities/types/User';
import AlertCard from './AlertCard';

type Props = {
  user: User,
  createTaskHandler(_t: string, _d: string): void,
}

function DependabotPanel({ user, createTaskHandler }: Props) {
  const { owner, repo } = useParams();

  const [dependabotNodes, setNodes] = useState<DependabotNode[]>([]);
  console.log(dependabotNodes);
  // console.log(dependabotAlerts);
  useEffect(() => {
    if (user && owner && repo) {
      const fetchAllerts = async () => {
        const response: DependabotResult = await fetchDependabotAlerts(
          owner,
          repo,
          10,
          user.accessToken,
        );
        setNodes(response.data.repository.vulnerabilityAlerts.nodes);
      };
      fetchAllerts();
    }
  }, []);

  // Add more button....
  return (
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
  );
}

export default DependabotPanel;
