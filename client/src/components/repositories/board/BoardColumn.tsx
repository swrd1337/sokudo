import { CheckIcon } from '@chakra-ui/icons';
import {
  Box, Divider, Editable, EditableInput, EditablePreview, Heading, HStack, useToast,
} from '@chakra-ui/react';
import React, { ReactNode, useState } from 'react';
import Validaton from '../../../constants/validationConstants';
import BoardMenu from './BoardMenu';

type Actions = {
  onDragStart(_colIndex: number): void,
  onDragEnter(_colIndex: number): void,
  onDropHandler(): void,
  renameColumn(_old: string, _new: string): void,
  deleteColumn(_name: string): void,
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

  const toast = useToast();

  let [localColor, titleColor] = ['gray.600', 'whiteAlpha'];
  if (dragItemIndex === index) {
    [localColor, titleColor] = ['purple.300', 'purple.300'];
  }

  const onChange = (newVal: string) => {
    setLocalName(newVal);
  };

  const onNameSubmit = (newVal: string) => {
    if (!columns.has(newVal)
    && newVal.length <= Validaton.DEFAULT_TITLE_LENGTH
    && newVal.length > 0
    ) {
      setLocalName(newVal);
      actions.renameColumn(value, newVal);
    } else {
      toast({
        title: 'Invalid column title!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
      });
      setLocalName(value);
    }
  };

  const onCancel = () => {
    setLocalName(value);
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
      zIndex="docked"
      draggable
      onDragStart={() => actions.onDragStart(index)}
      onDragEnter={() => actions.onDragEnter(index)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={actions.onDropHandler}
      onDragEnd={actions.onDropHandler}
    >
      <Box
        w="100%"
        p={5}
        pt={2}
        display="flex"
        flexDirection="column"
        flexGrow={1}
        _hover={{ cursor: 'grab' }}
      >
        <HStack justifyContent="space-between" pb={2}>
          <HStack color={titleColor}>
            {done && <CheckIcon />}
            <Heading as="h4" size="sm">
              <Editable
                value={localName}
                onChange={onChange}
                onSubmit={onNameSubmit}
                submitOnBlur={false}
                onBlur={onBlur}
                onCancel={onCancel}
              >
                <EditablePreview />
                <EditableInput />
              </Editable>
            </Heading>
          </HStack>
          {!done && (
            <Box mt="auto" alignSelf="end">
              <BoardMenu columnName={value} onDelete={actions.deleteColumn} />
            </Box>
          )}
        </HStack>
        <Divider mb="1" bgColor={localColor} />
        {children}
      </Box>
    </Box>
  );
}

export default BoardColumn;
