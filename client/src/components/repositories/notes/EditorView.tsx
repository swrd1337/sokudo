import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box, Button, Editable, EditableInput, EditablePreview, HStack, IconButton, Text, useToast,
} from '@chakra-ui/react';
import React, {
  FormEvent, useEffect, useState,
} from 'react';
import { fetchUpdateMarkdown } from '../../../api/markdownsApi';
import Validaton from '../../../constants/validationConstants';
import Markdown from '../../../utilities/types/Markdown';
import User from '../../../utilities/types/User';
import MarkdownComponent from '../../markdown/MarkdownComponent';

type Props = {
  user: User,
  mds: Markdown[],
  setMds(_mds: Markdown[]): void,
  selectedIndex: number,
  openDeleteModal(): void,
  setMdContentUpdateTrigger(_value: boolean): void,
  markdownTitle: string,
  contentState: {
    markdownContent: string,
    setMarkdownContent(_value: string): void
  }
}

function EditorView({
  user,
  mds,
  setMds,
  selectedIndex,
  openDeleteModal,
  setMdContentUpdateTrigger,
  markdownTitle,
  contentState,
}: Props) {
  const { markdownContent, setMarkdownContent } = contentState;

  const [newTitle, setNewTitle] = useState<string>(markdownTitle);
  const [contentEditMode, setContentEditMode] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    setContentEditMode(false);
  }, [mds, markdownTitle]);

  const toggleContentEditMode = () => {
    setContentEditMode(!contentEditMode);
  };

  const onTitleUpdateConfirm = async (value: string) => {
    if (value.length > 0 && value.length <= Validaton.DEFAULT_TITLE_LENGTH) {
      const md = mds[selectedIndex];
      md.title = value;
      const newMds = [...mds];
      newMds[selectedIndex] = md;
      setMds([...newMds]);
      await fetchUpdateMarkdown(md.id, md, user!.accessToken);
    } else {
      toast({
        title: 'Title cannot be empty',
        status: 'warning',
        isClosable: true,
        duration: 5000,
        position: 'bottom-right',
      });
      setNewTitle(markdownTitle);
    }
  };

  const onTitleUpdateChange = (value: string) => {
    if (value.length <= Validaton.DEFAULT_TITLE_LENGTH) {
      setNewTitle(value);
    }
  };

  const onContentUpdate = async (e: FormEvent<HTMLTextAreaElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= Validaton.NOTE_CONTENT_LENGTH) {
      setMarkdownContent(value);
      setMdContentUpdateTrigger(true);
    }
  };

  return (
    <Box
      flexGrow={1}
      p="10px"
      pt="0"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Box height="100%" w={{ sm: '100%', lg: '100%', xl: '5xl' }} display="flex" flexDir="column">
        <HStack spacing={3} p="10px" justifyContent="space-between">
          <Editable
            onEdit={() => setContentEditMode(false)}
            value={newTitle}
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
            <Button leftIcon={<DeleteIcon />} onClick={openDeleteModal}>
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
  );
}

export default EditorView;
