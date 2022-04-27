import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Badge, Container, Heading, HStack, IconButton, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchRepositoryData, fetchCreateRepositoryData } from '../../api/repositoriesApi';
import UserContext from '../../context/UserContext';
import RepositoryData from '../../utilities/RepositoryData';
import ViewContainer from '../../ViewContainer';
import RepositoryBoard from './board/RepositoryBoard';

function RepositoryView() {
  const navigate = useNavigate();
  const { owner, repo } = useParams();
  const { user } = useContext(UserContext);
  const [repositoryData, setRepositoryData] = useState<RepositoryData>();

  useEffect(() => {
    if (user && repo && owner) {
      const fetchRepoData = async () => {
        let data = await fetchRepositoryData(owner, repo, user?.accessToken);
        console.log(data)
        // if (!data) {
        //   data = await fetchCreateRepositoryData(owner, repo, user?.accessToken);
        // }
        // setRepositoryData(data);
      };
      console.log("HERE")
      fetchRepoData();
    }
  }, [user]);

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
            <Skeleton isLoaded={!!repositoryData} h="2em" w="10em">
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
            <Tab fontWeight="semibold">Versions</Tab>
          </TabList>
          <Skeleton isLoaded={!!repositoryData} height="80%">
            <TabPanels flexGrow={1} display="flex">
              <TabPanel overflowX="auto">
                {repositoryData && (
                  <RepositoryBoard
                    boardData={{
                      columns: repositoryData.boardColumns,
                      doneIndex: repositoryData.doneColumnIndex,
                    }}
                  />
                )}
              </TabPanel>
              <TabPanel>
                <p>TODO: MARKDOWN NOTES!</p>
              </TabPanel>
              <TabPanel>
                <p>TODO: VERSIONS!</p>
              </TabPanel>
            </TabPanels>
          </Skeleton>
        </Tabs>
      </Container>
    </ViewContainer>
  );
}

export default RepositoryView;
