import {
  AddIcon, ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon, ViewIcon,
} from '@chakra-ui/icons';
import {
  Box, Button, Editable, EditableInput, EditablePreview, HStack, IconButton, Text, Tooltip,
} from '@chakra-ui/react';
import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import {
  fetchDeleteMarkdown, fetchMarkdowns, fetchSaveMarkdown, fetchUpdateMarkdown,
} from '../../../api/markdownsApi';
import UserContext from '../../../context/UserContext';
import useDebouncedEffect from '../../../utilities/debounce';
import Markdown from '../../../utilities/types/Markdown';
import MarkdownComponent from '../../markdown/MarkdownComponent';
import AddNewEntry from '../board/common/AddNewEntry';

type Props = {
  repoId: number
}

function MarkdownsNotes({ repoId }: Props) {
  const { user } = useContext(UserContext);

  const [mds, setMds] = useState<Markdown[]>([]);
  const [addMdMode, setAddMdMode] = useState<boolean>(false);
  const [contentEditMode, setContentEditMode] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const [newTitle, setNewTitle] = useState<string>('');
  const [markdownTitle, setMarkdownTitle] = useState<string>('');
  const [invalidTitle, setInvalidTitle] = useState<boolean>(false);

  const [markdownContent, setMarkdownContent] = useState<string>('');
  const [mdContentUpdateTrigger, setMdContentUpdateTrigger] = useState<boolean>(false);

  const [reverse, setReverse] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const fetchMds = async () => {
        const data = await fetchMarkdowns(repoId, user.accessToken);
        setMds(data);
        if (data.length > 0) {
          setSelectedIndex(0);
          setMarkdownTitle(data[0].title);
          setMarkdownContent(data[0].content);
        }
      };
      fetchMds();
    }
  }, [user]);

  // Content debounce update.
  useDebouncedEffect(() => {
    const updateMdContent = async () => {
      if (selectedIndex >= 0 && mdContentUpdateTrigger) {
        const md = mds[selectedIndex];
        md.content = markdownContent;
        await fetchUpdateMarkdown(md.id, md, user!.accessToken);
        setMdContentUpdateTrigger(false);
      }
    };
    updateMdContent();
  }, [markdownContent], 1000);

  const onAddModeClick = () => {
    setAddMdMode(!addMdMode);
  };

  const onSubmitClick = async () => {
    if (newTitle && newTitle.length <= 24) {
      setInvalidTitle(false);
      setAddMdMode(false);
      let newMd: Markdown = {
        id: -1,
        title: newTitle,
        content: '## Hello, world!',
        repoId,
        author: user!.username,
      };
      newMd = await fetchSaveMarkdown(newMd, user!.accessToken);
      setMds([...mds, newMd]);
      setNewTitle('');
      setSelectedIndex(mds.length);
      setMarkdownTitle(newMd.title);
      setMarkdownContent(newMd.content);
    } else {
      setInvalidTitle(true);
    }
  };

  const onNewTitleChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= 24) {
      setNewTitle(value);
    }
  };

  const onMdButtonClick = (index: number) => {
    setSelectedIndex(index);
    setMarkdownTitle(mds[index].title);
    setMarkdownContent(mds[index].content);
    setAddMdMode(false);
    setContentEditMode(false);
  };

  const toggleContentEditMode = () => {
    setContentEditMode(!contentEditMode);
  };

  const onDeleteClick = async () => {
    if (selectedIndex >= 0) {
      const mdId = mds[selectedIndex].id;
      mds.splice(selectedIndex, 1);
      setMds([...mds]);
      const lastIndex = mds.length - 1;
      if (lastIndex < 0) {
        setSelectedIndex(-1);
        setMarkdownTitle('');
        setMarkdownContent('');
      } else {
        setSelectedIndex(lastIndex);
        setMarkdownTitle(mds[lastIndex].title);
        setMarkdownContent(mds[lastIndex].content);
      }
      await fetchDeleteMarkdown(mdId, user!.accessToken);
    }
  };

  const onTitleUpdateConfirm = async (value: string) => {
    if (value.length <= 24) {
      const md = mds[selectedIndex];
      md.title = value;
      mds[selectedIndex] = md;
      setMds([...mds]);
      await fetchUpdateMarkdown(md.id, md, user!.accessToken);
    }
  };

  const onTitleUpdateChange = (value: string) => {
    if (value.length <= 24) {
      setMarkdownTitle(value);
    }
  };

  const onContentUpdate = async (e: FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= 2048) {
      setMarkdownContent(value);
      setMdContentUpdateTrigger(true);
    }
  };

  const mdsMapCallback = (md: Markdown, index: number) => (
    <Button
      key={md.id}
      mb={1}
      w="100%"
      h={10}
      minH={10}
      variant="outline"
      bgColor="whiteAlpha.50"
      borderColor={index === selectedIndex ? 'purple.300' : 'inherit'}
      borderWidth="2px"
      justifyContent="start"
      color={index === selectedIndex ? 'purple.300' : 'whiteAlpha'}
      onClick={() => onMdButtonClick(index)}
    >
      {md.title}
    </Button>
  );

  const onReverseOrderClick = () => setReverse(!reverse);

  return (
    <Box w="100%" flexGrow={1} display="flex">
      <Box
        border="1px solid"
        borderColor="gray.600"
        bgColor="gray.700"
        borderRadius="lg"
        m={3}
        minW={300}
        maxW={300}
        display="flex"
        flexDir="column"
      >
        <Box
          display="flex"
          justifyContent="start"
          p={2}
          borderBottom="1px solid"
          borderColor="whiteAlpha.300"
        >
          {addMdMode && (
            <AddNewEntry
              onSubmit={onSubmitClick}
              onCancel={onAddModeClick}
              onInputChange={onNewTitleChange}
              width="100%"
              value={newTitle}
              isInvalid={invalidTitle}
            />
          )}
          {!addMdMode && (
            <HStack justifyContent="space-between" w="100%">
              <Tooltip label="Create note" hasArrow>
                <IconButton
                  variant="outline"
                  aria-label="Add note"
                  icon={<AddIcon color="green.300" />}
                  onClick={onAddModeClick}
                />
              </Tooltip>
              <Text fontSize="md" fontWeight="semibold">
                Workspace
              </Text>
              <Tooltip label="Change order" hasArrow>
                <IconButton
                  variant="outline"
                  aria-label="Reverse order"
                  icon={reverse ? <ArrowDownIcon /> : <ArrowUpIcon />}
                  onClick={onReverseOrderClick}
                />
              </Tooltip>
            </HStack>
          )}
        </Box>
        <Box display="flex" flexDir="column" overflow="auto" p={2}>
          {reverse ? mds.map(mdsMapCallback).reverse() : mds.map(mdsMapCallback)}
        </Box>
      </Box>
      {selectedIndex >= 0 && (
        <Box
          flexGrow={1}
          p="10px"
          pt="0"
          display="flex"
          flexDir="column"
          alignItems="center"
        >
          <Box height="100%" w="6xl" display="flex" flexDir="column">
            <HStack spacing={3} p="10px" justifyContent="space-between">
              <Editable
                value={markdownTitle}
                onChange={onTitleUpdateChange}
                onSubmit={onTitleUpdateConfirm}
                onCancel={onTitleUpdateConfirm}
                color="purple.300"
                fontSize="2xl"
                fontWeight="semibold"
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
              <HStack>
                <HStack pr={2}>
                  <Text fontStyle="italic">Author: </Text>
                  <Text fontWeight="semibold" color="teal.300">
                    {mds[selectedIndex].author}
                  </Text>
                </HStack>
                <IconButton
                  aria-label="Edit/View description"
                  icon={contentEditMode ? <ViewIcon /> : <EditIcon />}
                  onClick={toggleContentEditMode}
                />
                <Button leftIcon={<DeleteIcon />} onClick={onDeleteClick}>
                  Delete
                </Button>
              </HStack>
            </HStack>
            <MarkdownComponent
              editMode={contentEditMode}
              value={markdownContent}
              onChange={onContentUpdate}
              height="100%"
              bgColor="gray.700"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default MarkdownsNotes;
