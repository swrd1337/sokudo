import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box, Button, ButtonGroup, HStack, IconButton, Input, VStack,
} from '@chakra-ui/react';
import React, { FormEvent, useContext, useState } from 'react';
import { fetchUpdateRepositoryData } from '../../../api/repositoriesApi';
import UserContext from '../../../context/UserContext';
import useDebouncedEffect from '../../../utilities/debounce';
import RepositoryData from '../../../utilities/types/RepositoryData';
import BoardColumn from './BoardColumn';

type Props = {
  data: RepositoryData
}

function RepositoryBoard({ data }: Props) {
  const [columns, setColumns] = useState<Set<string>>(new Set(data.boardColumns));
  const [dragItemIndex, setDragItemIndex] = useState<number>(-1);
  const [addColumnMode, setAddColumnMode] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');
  const [dataUpdate, setDataUpdate] = useState<boolean>(false);
  const [doneColumnName, setDoneColumnName] = useState<string>(data.doneColumnName);

  const { user } = useContext(UserContext);

  useDebouncedEffect(() => {
    if (user && dataUpdate) {
      const updateRepoData = async () => {
        const newData = { ...data };
        newData.boardColumns = columns;
        newData.doneColumnName = doneColumnName;
        await fetchUpdateRepositoryData(newData, user.accessToken); // Return
        setDataUpdate(false);
      };
      updateRepoData();
    }
  }, [columns, dataUpdate], 1000);

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
    setDataUpdate(true);
  };

  const onAddModeClick = () => {
    setAddColumnMode(!addColumnMode);
    setColumnName('');
  };

  const onInputNameChange = (e: FormEvent<HTMLInputElement>) => {
    setColumnName(e.currentTarget.value);
  };

  const onSaveClick = () => {
    if (!columns.has(columnName)) {
      setColumns(columns.add(columnName));
      setAddColumnMode(!addColumnMode);
      setColumnName('');
      setDataUpdate(true);
    }
  };

  const renameColumn = (oldName: string, newName: string) => {
    if (oldName === data.doneColumnName) {
      setDoneColumnName(newName);
    }
    const newColums = [...columns];
    const index = newColums.indexOf(oldName);
    newColums[index] = newName;
    setColumns(new Set(newColums));
    setDataUpdate(true);
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <HStack>
        {[...columns].map((value, index) => (
          <BoardColumn
            // eslint-disable-next-line quotes
            key={value.split(" ").join("_")}
            value={value}
            index={index}
            done={doneColumnName === value}
            dragItemIndex={dragItemIndex}
            columns={columns}
            actions={{
              onDragStart,
              onDragEnter,
              onDropHandler,
              renameColumn,
            }}
          >
            <HStack justifyContent="center" pt="0.5em">
              {doneColumnName !== value && (
                <Button variant="ghost" colorScheme="purple">
                  Add Task
                </Button>
              )}
            </HStack>
          </BoardColumn>
        ))}
      </HStack>
      <Box ml="1em" display="flex">
        {addColumnMode && (
          <VStack alignItems="end">
            <Input
              placeholder="Column name"
              minW="13em"
              focusBorderColor="purple.400"
              onChange={onInputNameChange}
              isInvalid={columns.has(columnName)}
            />
            <ButtonGroup variant="outline" spacing="2">
              <IconButton
                variant="outline"
                aria-label="Close add column"
                icon={<CloseIcon color="gray.300" w="3" h="3" />}
                onClick={onAddModeClick}
              />
              <IconButton
                variant="outline"
                aria-label="Save column"
                icon={<CheckIcon color="green.300" />}
                onClick={onSaveClick}
              />
            </ButtonGroup>
          </VStack>
        )}
        {!addColumnMode && (
          <IconButton
            ml="0.5em"
            variant="outline"
            aria-label="Add column"
            icon={<AddIcon />}
            onClick={onAddModeClick}
          />
        )}
      </Box>
    </Box>
  );
}

export default RepositoryBoard;
