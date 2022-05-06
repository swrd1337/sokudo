import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';
import {
  Box, Button, Editable, EditableInput, EditablePreview, HStack, IconButton, Text,
} from '@chakra-ui/react';
import React, {
  FormEvent, useEffect, useState,
} from 'react';
import { fetchUpdateMarkdown } from '../../../api/markdownsApi';
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
    setMarkdownTitle(_value: string): void,
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
  const [contentEditMode, setContentEditMode] = useState<boolean>(false);

  const { markdownTitle, setMarkdownTitle } = titleState;
  const { markdownContent, setMarkdownContent } = contentState;

  useEffect(() => {
    setContentEditMode(false);
  }, [mds, markdownTitle]);

  const toggleContentEditMode = () => {
    setContentEditMode(!contentEditMode);
  };

  const onTitleUpdateConfirm = async (value: string) => {
    if (value.length <= 24) {
      const md = mds[selectedIndex];
      md.title = value;
      const newMds = [...mds];
      newMds[selectedIndex] = md;
      setMds([...newMds]);
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

  return (
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
            onEdit={() => setContentEditMode(false)}
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
