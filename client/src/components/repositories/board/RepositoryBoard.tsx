import { AddIcon } from '@chakra-ui/icons';
import {
  Box, HStack, IconButton,
} from '@chakra-ui/react';
import React, { FormEvent, useContext, useState } from 'react';
import { fetchUpdateRepositoryData } from '../../../api/repositoriesApi';
import UserContext from '../../../context/UserContext';
import useDebouncedEffect from '../../../utilities/debounce';
import RepositoryData from '../../../utilities/types/RepositoryData';
import BoardColumn from './BoardColumn';
import AddNewEntry from './common/AddNewEntry';
import TaskView from './tasks/TaskView';

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

  const deleteColumn = (colName: string) => {
    columns.delete(colName);
    setColumns(columns);
    setDataUpdate(true);
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <HStack alignItems="start">
        {[...columns].map((value, index) => (
          <BoardColumn
            key={value.split(' ').join('_')}
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
              deleteColumn,
            }}
          >
            <TaskView doneColumnName={doneColumnName} currentColumnName={value} />
          </BoardColumn>
        ))}
      </HStack>
      <Box ml="1em" display="flex">
        {addColumnMode && (
          <AddNewEntry
            onInputChange={onInputNameChange}
            onSubmit={onSaveClick}
            onCancel={onAddModeClick}
            isInvalid={columns.has(columnName)}
          />
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
