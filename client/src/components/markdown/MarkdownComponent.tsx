import { Box, Textarea } from '@chakra-ui/react';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import React, { FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  editMode: boolean,
  value: string,
  onChange(_e: FormEvent<HTMLTextAreaElement>): void,
  height: number | string,
  bgColor?: string,
}

function MarkdownComponent({
  editMode, value, onChange, height, bgColor,
}: Props) {
  return (
    <Box display="flex" h={height} overflow="auto">
      {editMode ? (
        <Textarea
          resize="none"
          onChange={onChange}
          defaultValue={value}
          h={height}
          bgColor={bgColor}
          autoFocus
          spellCheck
        />
      ) : (
        <Box
          overflow="auto"
          w="100%"
          border="1px solid"
          borderColor="teal.600"
          bgColor={bgColor}
          p={4}
          borderRadius="md"
          wordBreak="break-all"
        >
          <ReactMarkdown components={ChakraUIRenderer()}>{value}</ReactMarkdown>
        </Box>
      )}
    </Box>
  );
}

MarkdownComponent.defaultProps = {
  bgColor: 'gray.800',
};

export default MarkdownComponent;
