import { DeleteIcon } from '@chakra-ui/icons';
import {
  Avatar, Box, HStack, IconButton, Text,
} from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { fetchDeleteTaskComment } from '../../../../api/commentsApi';
import Comment from '../../../../utilities/types/Comment';
import User from '../../../../utilities/types/User';

type Props = {
  comment: Comment,
  user: User,
  removeComment(_id: number): void
}

function CommentCard({ comment, user, removeComment }: Props) {
  const onDeleteClick = async () => {
    const { id } = comment;
    removeComment(id);
    await fetchDeleteTaskComment(id, user.accessToken);
  };

  return (
    <Box pb={4}>
      <HStack spacing={3}>
        <Avatar src={comment.avatarUrl} alignSelf="start" />
        <Box bgColor="gray.700" pl={4} border="1px solid" borderRadius="lg" borderColor="teal.700" display="flex">
          <Box>
            <Text fontSize="lg" color="purple.300" fontWeight="semibold">{comment.username}</Text>
            <ReactMarkdown components={ChakraUIRenderer()}>
              {comment.content}
            </ReactMarkdown>
          </Box>
          {comment.userId === user.id && (
            <IconButton m="5px" ml="10px" size="xs" aria-label="Delete comment" icon={<DeleteIcon />} onClick={onDeleteClick} variant="outline" alignSelf="start" />
          )}
        </Box>
      </HStack>
    </Box>
  );
}

export default CommentCard;
