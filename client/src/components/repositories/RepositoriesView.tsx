import { Button, SimpleGrid } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { fetchRepositoriesData } from '../../api/repositoriesApi';
import UserContext from '../../context/UserContext';
import Repository from '../../utilities/types/Repository';
import ViewContainer from '../../ViewContainer';
import CenteredSpinner from '../common/CenteredSpinner';
import MainSkeleton from './MainSkeleton';
import RepositoryCard from './RepositoryCard';

const PER_PAGE_DEFAULT = 9;

function RepositoriesView() {
  const { user } = useContext(UserContext);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const fetchRepos = async () => {
        const data = await fetchRepositoriesData(currentPage, PER_PAGE_DEFAULT, user.accessToken);
        const tmpRepos = data.repositories;
        if (repositories.length === 0 || (tmpRepos[0].id !== repositories[0].id)) {
          setRepositories([...repositories, ...tmpRepos]);
          setLoading(false);
        }
      };
      fetchRepos();
    }
  }, [user, currentPage]);

  return (
    <ViewContainer>
      {repositories.length ? (
        <>
          <SimpleGrid
            columns={{
              sm: 1, lg: 2, '2xl': 3,
            }}
            gap={10}
            mb={8}
            justifyItems="center"
          >
            {repositories?.map((repo: Repository) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
          </SimpleGrid>
          {repositories && ((currentPage * PER_PAGE_DEFAULT) <= repositories.length) && (
            <Button
              mb={5}
              onClick={() => {
                setLoading(true);
                setCurrentPage(currentPage + 1);
              }}
              variant="ghost"
              color="gray.500"
              borderRadius="full"
            >
              More
            </Button>
          )}
          {loading && <CenteredSpinner />}
        </>
      ) : (
        <MainSkeleton />
      )}
    </ViewContainer>
  );
}

export default RepositoriesView;
