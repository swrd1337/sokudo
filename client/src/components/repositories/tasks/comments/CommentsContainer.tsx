import {
  Box,
  Button, HStack, Input, Skeleton, Stack, Text,
} from '@chakra-ui/react';
import React, { FormEvent, useEffect, useState } from 'react';
import { fetchSaveTaskComment, fetchTaskComments } from '../../../../api/commentsApi';
import Comment from '../../../../utilities/types/Comment';
import User from '../../../../utilities/types/User';
import CommentCard from './CommentCard';

type Props = {
  user: User,
  taskId: number,
}

function CommentsContainer({ user, taskId }: Props) {
  const [commentValue, setCommentValue] = useState<string>('');
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const data = await fetchTaskComments(taskId, user.accessToken);
      setComments(data);
    };
    fetchComments();
  }, []);

  const onAddClick = async () => {
    if (commentValue && commentValue.length <= 256) {
      let newComment: Comment = {
        id: -1,
        userId: user.id,
        username: user.username,
        avatarUrl: user.avatarUrl,
        content: commentValue,
        taskId,
      };
      setCommentValue('');
      newComment = await fetchSaveTaskComment(newComment, user.accessToken);
      setComments([...comments, newComment]);
    }
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= 256) {
      setCommentValue(value);
    }
  };

  const removeComment = (id: number) => {
    const tmpComs = comments.filter((com) => com.id !== id);
    setComments(tmpComs);
  };

  return (
    <Stack spacing={5} overflow="auto" p={3} w="100%">
      <HStack pb={4}>
        <Input
          placeholder="Add new commnet"
          value={commentValue}
          onChange={onChange}
        />
        <Button w="20%" color="teal.300" onClick={onAddClick}>
          Add
        </Button>
      </HStack>
      <Skeleton isLoaded={!!comments} w="100%" minH={16} overflow="auto">
        { comments.length ? (
          comments.map((com) => com && (
            <CommentCard
              key={com.id}
              comment={com}
              user={user}
              removeComment={removeComment}
            />
          ))
        ) : (
          <Box display="flex" justifyContent="center">
            <Text color="whiteAlpha.300">No comments</Text>
          </Box>
        )}
      </Skeleton>
    </Stack>
  );
}

export default CommentsContainer;
