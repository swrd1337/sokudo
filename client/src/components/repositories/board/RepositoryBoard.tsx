import { DragHandleIcon } from '@chakra-ui/icons';
import {
  Box, Divider, Heading, HStack,
} from '@chakra-ui/react';
import React, { useState } from 'react';

type BoardData = {
  columns: Set<string>,
  doneIndex: number
}

type Props = {
  boardData: BoardData
}

function RepositoryBoard({ boardData }: Props) {
  const [columns, setColumns] = useState<Set<string>>(boardData.columns);
  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);

  const onDragStart = (index: number) => {
    setDragItemIndex(index);
  };

  const onDragEnter = (index: number) => {
    const newColums = [...columns];
    const item = newColums[dragItemIndex];
    newColums.splice(dragItemIndex, 1);
    newColums.splice(index, 0, item);
    setDragItemIndex(index);
    setColumns(new Set(newColums));
  };

  const onDropHandler = () => {
    setDragItemIndex(-1);
  };

  // I will try some suspense
  // https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/
  // Add delete button
  // Add renmae.
  return (
    <HStack>
      {[...columns].map((value, index) => (
        <Box
          key={value}
          minW="xs"
          maxW="xs"
          minH="sm"
          borderWidth="1px"
          borderRadius="lg"
          borderColor={dragItemIndex === index ? 'purple.300' : 'gray.600'}
          bgColor="gray.700"
          boxShadow="dark-sm"
          w="100%"
          onDragStart={() => onDragStart(index)}
          onDragEnter={() => onDragEnter(index)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={onDropHandler}
          onDragEnd={onDropHandler}
        >
          <Box p="5" display="flex" flexDirection="column" h="100%" draggable>
            <HStack justifyContent="space-between" pb="1em">
              <Heading as="h4" size="sm" color={dragItemIndex === index ? 'purple.300' : 'whiteAlpha.900'}>
                {value}
              </Heading>
              <DragHandleIcon color="gray.600" _hover={{ cursor: 'move', color: 'gray.300' }} />
            </HStack>
            <Divider mb="1" bgColor={dragItemIndex === index ? 'purple.300' : 'gray.600'} />
          </Box>
        </Box>
      ))}
    </HStack>
  );
}

export default RepositoryBoard;
