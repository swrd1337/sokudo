import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Badge, Container, Heading, HStack, IconButton, Skeleton, Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchCreateRepositoryData, fetchRepositoryData } from '../../api/repositoriesApi';
import UserContext from '../../context/UserContext';
import useDebouncedEffect from '../../utilities/debounce';
import RepositoryData from '../../utilities/types/RepositoryData';
import ViewContainer from '../../ViewContainer';
import RepositoryBoard from './board/RepositoryBoard';
import MarkdownsTab from './markdownNotes/MarkdownsTab';

function RepositoryView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

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
  }, [user], 300);

  const onBackClick = () => {
    navigate('/');
  };

  const onTabChange = (index: number) => {
    searchParams.set('tab', index.toString());
    setSearchParams(searchParams);
  };

  return (
    <ViewContainer fullH>
      <Container maxW="100%" h="100%" display="flex" flexDirection="column" flexGrow={1}>
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
          isLazy
          index={+(searchParams.get('tab') ?? 0)}
          onChange={onTabChange}
        >
          <TabList>
            <Tab fontWeight="semibold">Kanban Board</Tab>
            <Tab fontWeight="semibold">Markdown Notes</Tab>
            <Tab fontWeight="semibold">Code Scanning</Tab>
          </TabList>
          <Skeleton isLoaded={!!repositoryData} h="100%">
            {repositoryData && (
              <TabPanels display="flex" h="100%" borderLeft="1px solid" borderRight="1px solid" borderColor="whiteAlpha.300">
                <TabPanel overflow="auto" w="100%">
                  <RepositoryBoard data={repositoryData} />
                </TabPanel>
                <TabPanel w="100%" display="flex">
                  <MarkdownsTab repoId={repositoryData.id} />
                </TabPanel>
                <TabPanel>
                  <p>Code Scanning View: https://docs.github.com/en/rest/code-scanning</p>
                </TabPanel>
              </TabPanels>
            )}
          </Skeleton>
        </Tabs>
      </Container>
    </ViewContainer>
  );
}

export default RepositoryView;
