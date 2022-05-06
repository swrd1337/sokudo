import {
  Box, Button,
} from '@chakra-ui/react';
import React from 'react';
import Markdown from '../../../utilities/types/Markdown';

type Props = {
  selectedIndex: number,
  onMdButtonClick(_index: number): void,
  mds: Markdown[],
  reverse: boolean
}

function NotesList({
  selectedIndex, onMdButtonClick, mds, reverse,
}: Props) {
  const markdownsMap = (md: Markdown, index: number) => (
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

  return (
    <Box display="flex" flexDir="column" overflow="auto" p={2}>
      {reverse ? mds.map(markdownsMap).reverse() : mds.map(markdownsMap)}
    </Box>
  );
}

export default NotesList;
