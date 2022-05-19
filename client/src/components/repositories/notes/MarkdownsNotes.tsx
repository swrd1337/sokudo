import {
  AddIcon, ArrowDownIcon, ArrowUpIcon,
} from '@chakra-ui/icons';
import {
  Box, HStack, IconButton, Text, Tooltip, useDisclosure,
} from '@chakra-ui/react';
import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import {
  fetchDeleteMarkdown, fetchMarkdowns, fetchSaveMarkdown, fetchUpdateMarkdown,
} from '../../../api/markdownsApi';
import Validaton from '../../../constants/validationConstants';
import UserContext from '../../../context/UserContext';
import useDebouncedEffect from '../../../utilities/debounce';
import Markdown from '../../../utilities/types/Markdown';
import DeleteConfirmation from '../../modals/DeleteConfirmation';
import AddNewEntry from '../board/common/AddNewEntry';
import EditorView from './EditorView';
import NotesList from './NotesList';

type Props = {
  repoId: number
}

function MarkdownsNotes({ repoId }: Props) {
  const { user } = useContext(UserContext);

  const deleteModal = useDisclosure();

  const [mds, setMds] = useState<Markdown[]>([]);
  const [addMdMode, setAddMdMode] = useState<boolean>(false);
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
    if (newTitle && newTitle.length <= Validaton.DEFAULT_TITLE_LENGTH) {
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
    if (value.length <= Validaton.DEFAULT_TITLE_LENGTH) {
      setNewTitle(value);
    }
  };

  const onMdButtonClick = (index: number) => {
    setSelectedIndex(index);
    setMarkdownTitle(mds[index].title);
    setMarkdownContent(mds[index].content);
    setAddMdMode(false);
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
                  onClick={() => setReverse(!reverse)}
                />
              </Tooltip>
            </HStack>
          )}
        </Box>
        <NotesList
          mds={mds}
          onMdButtonClick={onMdButtonClick}
          reverse={reverse}
          selectedIndex={selectedIndex}
        />
      </Box>
      {selectedIndex >= 0 && (
        <EditorView
          user={user!}
          mds={mds}
          setMds={setMds}
          selectedIndex={selectedIndex}
          openDeleteModal={deleteModal.onOpen}
          setMdContentUpdateTrigger={setMdContentUpdateTrigger}
          titleState={{
            markdownTitle,
            setMarkdownTitle,
          }}
          contentState={{
            markdownContent,
            setMarkdownContent,
          }}
        />
      )}
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirmClick={() => {
          deleteModal.onClose();
          onDeleteClick();
        }}
      />
    </Box>
  );
}

export default MarkdownsNotes;
