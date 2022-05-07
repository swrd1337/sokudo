import { SimpleGrid } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { fetchRepositoriesData } from '../../api/repositoriesApi';
import UserContext from '../../context/UserContext';
import Repository from '../../utilities/types/Repository';
import ViewContainer from '../../ViewContainer';
import MainSkeleton from './MainSkeleton';
import RepositoryCard from './RepositoryCard';

function RepositoriesView() {
  const { user } = useContext(UserContext);
  const [repositories, setRepositories] = useState<Repository[]>();

  useEffect(() => {
    if (user) {
      const fetchRepos = async () => {
        const data = await fetchRepositoriesData(user.accessToken);
        setRepositories(data.repositories);
      };
      fetchRepos();
    }
  }, [user]);

  return (
    <ViewContainer>
      {repositories ? (
        <SimpleGrid columns={3} spacing={10} w="90%" mb={8}>
          {repositories?.map((repo: Repository) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </SimpleGrid>
      ) : (
        <MainSkeleton />
      )}
    </ViewContainer>
  );
}

export default RepositoriesView;
