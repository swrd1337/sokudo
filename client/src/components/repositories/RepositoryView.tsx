import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Badge, Container, Heading, HStack, IconButton, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCreateRepositoryData, fetchRepositoryData } from '../../api/repositoriesApi';
import UserContext from '../../context/UserContext';
import useDebouncedEffect from '../../utilities/debounce';
import RepositoryData from '../../utilities/types/RepositoryData';
import ViewContainer from '../../ViewContainer';
import RepositoryBoard from './board/RepositoryBoard';

function RepositoryView() {
  const navigate = useNavigate();
  const { owner, repo } = useParams();
  const { user } = useContext(UserContext);
  const [repositoryData, setRepositoryData] = useState<RepositoryData>();

  useDebouncedEffect(() => {
    if (user && repo && owner) {
      const fetchRepoData = async () => {
        let data = await fetchRepositoryData(owner, repo, user?.accessToken);
        if (!data) {
          data = await fetchCreateRepositoryData(owner, repo, user?.accessToken);
        }
        setRepositoryData(data);
      };
      fetchRepoData();
    }
  }, [user], 1000);

  const onBackClick = () => {
    navigate('/');
  };

  return (
    <ViewContainer fullH>
      <Container maxW="none" display="flex" flexDirection="column" flexGrow={1}>
        <HStack pb="5" justifyContent="space-between">
          {/* Extract into component */}
          <HStack>
            <IconButton
              aria-label="Back to all"
              icon={<ArrowLeftIcon color="gray.500" />}
              size="sm"
              onClick={onBackClick}
            />
            <Skeleton isLoaded={!!repositoryData} h="2em" minW="10em">
              <Heading as="h4" size="md">
                {repositoryData?.repoName}
              </Heading>
            </Skeleton>
          </HStack>
          <Skeleton isLoaded={!!repositoryData} h="2em" w="10em">
            <HStack>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {repositoryData?.visibility}
              </Badge>
              <Badge borderRadius="full" px="2" colorScheme="purple">
                {repositoryData?.defaultBranch}
              </Badge>
            </HStack>
          </Skeleton>
        </HStack>
        <Tabs
          variant="enclosed"
          display="flex"
          flexDirection="column"
          flexGrow={1}
        >
          <TabList>
            <Tab fontWeight="semibold">Kanban Board</Tab>
            <Tab fontWeight="semibold">Markdown Notes</Tab>
            <Tab fontWeight="semibold">Code Scanning</Tab>
          </TabList>
          <Skeleton isLoaded={!!repositoryData} h="100%">
            <TabPanels display="flex" h="100%">
              <TabPanel overflowX="auto" w="100%">
                {repositoryData && (
                  <RepositoryBoard
                    data={repositoryData}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <p>Markdown Notes View</p>
              </TabPanel>
              <TabPanel>
                <p>Code Scanning View: https://docs.github.com/en/rest/code-scanning</p>
              </TabPanel>
            </TabPanels>
          </Skeleton>
        </Tabs>
      </Container>
    </ViewContainer>
  );
}

export default RepositoryView;
