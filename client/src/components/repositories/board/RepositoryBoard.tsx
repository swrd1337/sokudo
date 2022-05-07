import { AddIcon } from '@chakra-ui/icons';
import {
  Box, Editable, EditableInput, EditablePreview, HStack, IconButton, Tooltip, useToast,
} from '@chakra-ui/react';
import React, {
  FormEvent, useContext, useEffect, useState,
} from 'react';
import { fetchUpdateBoard } from '../../../api/boardApi';
import { fetchTasks, fetchUpdateTask } from '../../../api/tasksApi';
import UserContext from '../../../context/UserContext';
import useDebouncedEffect from '../../../utilities/debounce';
import Board from '../../../utilities/types/Board';
import Task from '../../../utilities/types/Task';
import BoardColumn from './BoardColumn';
import BoardSelector from './BoardSelector';
import AddNewEntry from './common/AddNewEntry';
import TaskList from './tasks/TaskList';

type Props = {
  board: Board
  updateBoard(_board: Board): void,
}

function RepositoryBoard({ board, updateBoard }: Props) {
  const [boardTitle, setBoardTitle] = useState<string>('');
  const titleToast = useToast();

  const [columns, setColumns] = useState<Set<string>>(new Set());
  const [tasks, setTasks] = useState<Task[]>([]);

  const [dragColIndex, setDragColIndex] = useState<number>(-1);
  const [dragTaskMode, setDragTaskMode] = useState<boolean>(false);

  const [doneColumnName, setDoneColumnName] = useState<string>('');
  const [addColumnMode, setAddColumnMode] = useState<boolean>(false);
  const [columnName, setColumnName] = useState<string>('');

  const [dataUpdate, setDataUpdate] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      const getTasks = async () => {
        const responseData: Task[] = await fetchTasks(board.id, user.accessToken);
        setTasks(responseData);
      };
      getTasks();
    }
    setBoardTitle(board.name);
    setColumns(board.boardColumns);
    setDoneColumnName(board.doneColumnName);
  }, [board]);

  useDebouncedEffect(() => {
    if (user && dataUpdate) {
      const updateRepoData = async () => {
        const newBoard = { ...board, boardColumns: columns };
        await fetchUpdateBoard(board.id, newBoard, user.accessToken);
        setDataUpdate(false);
      };
      updateRepoData();
    }
  }, [columns, dataUpdate], 1000);

  const onDragStart = (colIndex: number, _taskMode?: boolean) => {
    setDragColIndex(colIndex);
    if (_taskMode) {
      setDragTaskMode(true);
    }
  };

  const onDragEnter = (colIndex: number) => {
    setDragColIndex(colIndex);
    if (!dragTaskMode) {
      const newColums = [...columns];
      const item = newColums[dragColIndex];
      newColums.splice(dragColIndex, 1);
      newColums.splice(colIndex, 0, item);
      setColumns(new Set(newColums));
    }
  };

  const onDropHandler = () => {
    if (!dragTaskMode) {
      setDragColIndex(-1);
      setDataUpdate(true);
    }
  };

  const onDragEndHandler = async (task: Task) => {
    if (dragColIndex > -1) {
      const dragColumnName = [...columns].at(dragColIndex);
      if (dragColumnName && dragColumnName !== task.columnName) {
        const updatedTask = { ...task };
        updatedTask.columnName = dragColumnName;
        const tempTasks = tasks.filter((t) => t.id !== task.id);
        setTasks([...tempTasks, updatedTask]);
        await fetchUpdateTask(updatedTask, user!.accessToken);
      }
    }
    setDragTaskMode(false);
    setDragColIndex(-1);
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
    if (oldName === board.doneColumnName) {
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

  const onBoardTitleConfirm = async () => {
    const { length } = boardTitle;
    if (length > 0 && length <= 32) {
      if (boardTitle !== board.name) {
        const newBoard = { ...board };
        newBoard.name = boardTitle;
        updateBoard(newBoard);
        await fetchUpdateBoard(board.id, newBoard, user!.accessToken);
        titleToast({
          title: 'Title updated!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    } else {
      setBoardTitle(board.name);
      titleToast({
        title: 'Title cannot be empty!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" flexDir="column" h="100%">
      <Box
        w="100%"
        p={2}
        pos="sticky"
        display="flex"
        top={0}
        bgColor="gray.800"
        zIndex="sticky"
        borderBottom="1px solid"
        borderTop="1px solid"
        borderColor="whiteAlpha.300"
        justifyContent="space-between"
      >
        <Editable
          pl={2}
          value={boardTitle}
          onChange={(value: string) => setBoardTitle(value)}
          onSubmit={onBoardTitleConfirm}
          onCancel={() => setBoardTitle(board.name)}
          color="purple.300"
          fontSize="xl"
          fontWeight="semibold"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <Box display="flex">
          {board && (<BoardSelector />)}
          <HStack>
            {!addColumnMode && (
              <Tooltip label="Add collumn" hasArrow>
                <IconButton
                  variant="outline"
                  aria-label="Add column"
                  icon={<AddIcon color="green.300" />}
                  onClick={onAddModeClick}
                />
              </Tooltip>
            )}
            {addColumnMode && (
              <AddNewEntry
                onInputChange={onInputNameChange}
                onSubmit={onSaveClick}
                onCancel={onAddModeClick}
                isInvalid={columns.has(columnName)}
                value={columnName}
                inline
              />
            )}
          </HStack>
        </Box>
      </Box>
      <HStack alignItems="start" p={3} overflow="auto" h="100%">
        {[...columns].map((value, index) => (
          <BoardColumn
            key={value.split(' ').join('_')}
            value={value}
            index={index}
            done={doneColumnName === value}
            dragItemIndex={dragColIndex}
            columns={columns}
            actions={{
              onDragStart,
              onDragEnter,
              onDropHandler,
              renameColumn,
              deleteColumn,
            }}
          >
            <TaskList
              doneColumnName={doneColumnName}
              currentColumnName={value}
              boardId={board.id}
              accessToken={user!.accessToken}
              username={user!.username}
              tasks={tasks}
              actions={{
                onDragEndHandler,
                onDragStart,
                setTasks,
              }}
            />
          </BoardColumn>
        ))}
      </HStack>
    </Box>
  );
}

export default RepositoryBoard;
