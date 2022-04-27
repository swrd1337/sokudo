import { CheckIcon, DragHandleIcon } from '@chakra-ui/icons';
import {
  Box, Divider, Heading, HStack,
} from '@chakra-ui/react';
import React from 'react';

type Actions = {
  onDragStart: (_index: number) => void,
  onDragEnter: (_index: number) => void,
  onDropHandler: () => void
}

type Props = {
  value: string,
  index: number,
  done: boolean,
  dragItemIndex: number,
  actions: Actions
}

function BoardColumn({
  value, index, done, dragItemIndex, actions,
}: Props) {
  const titleColor: string = dragItemIndex === index ? 'purple.300' : 'whiteAlpha.900';
  const dividerColor: string = dragItemIndex === index ? 'purple.300' : 'gray.600';

  return (
    <Box
      minW="xs"
      maxW="xs"
      minH="sm"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={dragItemIndex === index ? 'purple.300' : 'gray.600'}
      bgColor="gray.700"
      boxShadow="dark-sm"
      w="100%"
      onDragStart={() => actions.onDragStart(index)}
      onDragEnter={() => actions.onDragEnter(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={actions.onDropHandler}
      onDragEnd={actions.onDropHandler}
    >
      <Box p="5" display="flex" flexDirection="column" h="100%" draggable>
        <HStack justifyContent="space-between" pb="1em">
          <HStack color={titleColor}>
            { done && <CheckIcon /> }
            <Heading as="h4" size="sm">
              {value}
            </Heading>
          </HStack>
          <DragHandleIcon color="gray.600" _hover={{ cursor: 'move', color: 'gray.300' }} />
        </HStack>
        <Divider mb="1" bgColor={dividerColor} />
      </Box>
    </Box>
  );
}

export default BoardColumn;
