import { ArrowLeftIcon } from '@chakra-ui/icons';
import {
  Badge,
  Container,
  Heading,
  HStack,
  IconButton, Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { fetchDeleteBoard } from '../../api/boardApi';
import { fetchCreateRepositoryData, fetchRepositoryData } from '../../api/repositoriesApi';
import BoardsContext from '../../context/BoardsContext';
import UserContext from '../../context/UserContext';
import Board from '../../utilities/types/Board';
import RepositoryData from '../../utilities/types/RepositoryData';
import ViewContainer from '../../ViewContainer';
import RepositoryBoard from './board/RepositoryBoard';
import MarkdownsNotes from './notes/MarkdownsNotes';

function RepositoryView() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { owner, repo } = useParams();
  const { user } = useContext(UserContext);
  const [repositoryData, setRepositoryData] = useState<RepositoryData>();

  const [boardIndex, setBoardIndex] = useState<number>(0);

  const toast = useToast();

  useEffect(() => {
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
  }, [user]);

  useEffect(() => {
    if (boardIndex === -1) {
      setBoardIndex(0);
    }
  }, [boardIndex]);

  const onBackClick = () => {
    navigate('/');
  };

  const onTabChange = (index: number) => {
    searchParams.set('tab', index.toString());
    setSearchParams(searchParams);
  };

  const addBoard = (newBoard: Board) => {
    if (repositoryData) {
      repositoryData.boards.push(newBoard);
      setBoardIndex(repositoryData.boards.length - 1);
      setRepositoryData(repositoryData);
    }
  };

  const deleteBoard = async () => {
    if (repositoryData && repositoryData.boards.length > 1) {
      const boardToDelete = repositoryData.boards[boardIndex];
      repositoryData.boards.splice(boardIndex, 1);
      setRepositoryData(repositoryData);
      setBoardIndex(boardIndex === 0 ? -1 : boardIndex - 1);
      await fetchDeleteBoard(boardToDelete.id, user!.accessToken);
    } else {
      toast({
        title: 'You should have at least one Kanban Board',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const updateBoard = (board: Board) => {
    if (repositoryData) {
      const data = { ...repositoryData };
      data.boards[boardIndex] = board;
      setRepositoryData(data);
    }
  };

  return (
    <ViewContainer fullH>
      <Container
        maxW="100%"
        h="100%"
        display="flex"
        flexDirection="column"
        flexGrow={1}
      >
        <HStack pb={3} justifyContent="space-between">
          <HStack justifyContent="start">
            <IconButton
              aria-label="Back to all"
              icon={<ArrowLeftIcon color="gray.500" />}
              size="sm"
              onClick={onBackClick}
            />
            <Skeleton isLoaded={!!repositoryData} h={8} minW={20}>
              <Heading as="h4" size="md">
                {repositoryData?.repoName}
              </Heading>
            </Skeleton>
            <Skeleton isLoaded={!!repositoryData} h={8} minW={20}>
              <Badge borderRadius="full" px="2" colorScheme="teal">
                {repositoryData?.visibility}
              </Badge>
              <Badge borderRadius="full" px="2" ml={1} colorScheme="purple">
                {repositoryData?.defaultBranch}
              </Badge>
            </Skeleton>
          </HStack>
        </HStack>
        <Tabs
          variant="enclosed"
          display="flex"
          flexDirection="column"
          flexGrow={1}
          overflow="auto"
          isLazy
          index={+(searchParams.get('tab') ?? 0)}
          onChange={onTabChange}
        >
          <TabList>
            <Tab fontWeight="semibold" _focus={{ boxShadow: 'none' }}>
              Kanban Board
            </Tab>
            <Tab fontWeight="semibold" _focus={{ boxShadow: 'none' }}>
              Markdown Notes
            </Tab>
            <Tab fontWeight="semibold" _focus={{ boxShadow: 'none' }}>
              Code Scanning
            </Tab>
            <Tab fontWeight="semibold" _focus={{ boxShadow: 'none' }}>
              Pull Requests
            </Tab>
            <Tab fontWeight="semibold" _focus={{ boxShadow: 'none' }}>
              Statistics
            </Tab>
          </TabList>
          <Skeleton isLoaded={!!repositoryData} h="100%" overflow="auto">
            {repositoryData && (
              <TabPanels
                display="flex"
                overflow="auto"
                h="100%"
                borderLeft="1px solid"
                borderRight="1px solid"
                borderColor="whiteAlpha.300"
              >
                <TabPanel w="100%" p="0">
                  {/* eslint-disable-next-line react/jsx-no-constructed-context-values */ }
                  <BoardsContext.Provider value={{
                    boardIndex,
                    boards: repositoryData.boards,
                    repoId: repositoryData.id,
                    setBoardIndex,
                    addBoard,
                    deleteBoard,
                  }}
                  >
                    {boardIndex !== -1 && (
                      <RepositoryBoard
                        board={repositoryData.boards[boardIndex]}
                        updateBoard={updateBoard}
                      />
                    )}
                  </BoardsContext.Provider>
                </TabPanel>
                <TabPanel w="100%" display="flex" p="0">
                  <MarkdownsNotes repoId={repositoryData.id} />
                </TabPanel>
                <TabPanel>
                  <p>
                    Code Scanning View:
                    https://docs.github.com/en/rest/code-scanning
                  </p>
                </TabPanel>
                <TabPanel>
                  <p>
                    Commits View:
                    https://docs.github.com/en/rest/commits/commits
                  </p>
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
