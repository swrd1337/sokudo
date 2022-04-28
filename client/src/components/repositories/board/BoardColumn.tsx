import { CheckIcon, DragHandleIcon } from '@chakra-ui/icons';
import {
  Box, Divider, Editable, EditableInput, EditablePreview, Heading, HStack,
} from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import BoardMenu from './BoardMenu';

type Actions = {
  onDragStart: (_index: number) => void,
  onDragEnter: (_index: number) => void,
  onDropHandler: () => void,
  renameColumn: (_old: string, _new: string) => void,
  deleteColumn: (_name: string) => void,
}

type Props = {
  value: string,
  index: number,
  done: boolean,
  dragItemIndex: number,
  columns: Set<string>
  actions: Actions,
  children: ReactNode
}

function BoardColumn({
  value, index, done, dragItemIndex, actions, columns, children,
}: Props) {
  const [localName, setLocalName] = useState<string>(value);
  const [invalid, setInvalid] = useState<boolean>(false);

  const localColor: string = dragItemIndex === index ? 'purple.300' : 'gray.600';
  const titleColor: string = dragItemIndex === index ? 'purple.300' : 'whiteAlpha.900';
  const previewColor = invalid ? 'red.300' : 'white';

  const onChange = (newVal: string) => {
    setLocalName(newVal);
  };

  const onNameSubmit = (newVal: string) => {
    if (columns.has(newVal)) {
      setInvalid(true);
    } else {
      setInvalid(false);
      setLocalName(newVal);
      actions.renameColumn(value, newVal);
    }
  };

  const onCancel = () => {
    setLocalName(value);
    setInvalid(false);
  };

  const onBlur = () => {
    setLocalName(value);
  };

  return (
    <Box
      minW="xs"
      maxW="xs"
      minH="xs"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={localColor}
      bgColor="gray.700"
      boxShadow="dark-sm"
      w="100%"
      display="flex"
      onDragStart={() => actions.onDragStart(index)}
      onDragEnter={() => actions.onDragEnter(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={actions.onDropHandler}
      onDragEnd={actions.onDropHandler}
    >
      <Box p="5" display="flex" flexDirection="column" flexGrow={1} draggable>
        <HStack justifyContent="space-between" pb="1em">
          <HStack color={titleColor}>
            { done && <CheckIcon /> }
            <Heading as="h4" size="sm">
              <Editable
                value={localName}
                onChange={onChange}
                onSubmit={onNameSubmit}
                submitOnBlur={false}
                onBlur={onBlur}
                onCancel={onCancel}
              >
                <EditablePreview color={previewColor} />
                <EditableInput />
              </Editable>
            </Heading>
          </HStack>
          <DragHandleIcon color="gray.600" _hover={{ cursor: 'move', color: 'gray.300' }} />
        </HStack>
        <Divider mb="1" bgColor={localColor} />
        {children}
        {!done && (
          <Box mt="auto" alignSelf="end">
            <BoardMenu columnName={value} onDelete={actions.deleteColumn} />
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default BoardColumn;
