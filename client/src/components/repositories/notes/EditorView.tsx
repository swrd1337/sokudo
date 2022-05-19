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
  titleState: {
    markdownTitle: string,
    setMarkdownTitle(_value: string): void
  },
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
  titleState,
  contentState,
}: Props) {
  const { markdownTitle, setMarkdownTitle } = titleState;
  const { markdownContent, setMarkdownContent } = contentState;

  const [title, setTitle] = useState<string>('');
  const [contentEditMode, setContentEditMode] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    setContentEditMode(false);
    setTitle(markdownTitle);
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
      setMarkdownTitle(title);
      await fetchUpdateMarkdown(md.id, md, user!.accessToken);
    } else {
      toast({
        title: 'Invalid note title!',
        status: 'warning',
        isClosable: true,
        duration: 5000,
        position: 'bottom-right',
      });
      setTitle(markdownTitle);
    }
  };

  const onTitleUpdateChange = (value: string) => {
    if (value.length <= Validaton.DEFAULT_TITLE_LENGTH) {
      setTitle(value);
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
            value={title}
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
