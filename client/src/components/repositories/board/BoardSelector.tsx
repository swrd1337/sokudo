import { AddIcon, ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button, HStack, Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import BoardsContext from '../../../context/BoardsContext';
import DeleteConfirmation from '../../modals/DeleteConfirmation';
import NewBoardModal from './NewBoardModal';

function BoardSelector() {
  const {
    boardIndex, setBoardIndex, repoData, addBoard,
  } = useContext(BoardsContext);
  const { boards } = repoData!;

  const newBoardModal = useDisclosure();
  const deleteModal = useDisclosure();

  const onItemClick = (_index: number) => setBoardIndex(_index);

  return (
    <>
      <Menu flip isLazy>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="outline"
          mr={2}
        >
          Switch boards
        </MenuButton>
        <MenuList zIndex={2}>
          {boards.map((board, index) => (
            <MenuItem
              key={board.id}
              color={index === boardIndex ? 'purple.200' : 'whiteAlpha'}
              fontWeight={index === boardIndex ? 'semibold' : 'normal'}
              onClick={() => onItemClick(index)}
            >
              {board.name}
            </MenuItem>
          ))}
          <MenuDivider />
          <MenuItem onClick={newBoardModal.onOpen} icon={<AddIcon />}>
            Create new board
          </MenuItem>
          <MenuItem onClick={deleteModal.onOpen} icon={<DeleteIcon />}>
            <HStack spacing={1}>
              <Text>Delete</Text>
              <Text fontWeight="semibold" color="purple.200">
                {`"${boards[boardIndex].name}"`}
              </Text>
            </HStack>
          </MenuItem>
        </MenuList>
      </Menu>
      <NewBoardModal
        isOpen={newBoardModal.isOpen}
        onClose={newBoardModal.onClose}
        repoData={repoData!}
        addBoard={addBoard}
      />
      <DeleteConfirmation
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.onClose}
        onConfirmClick={() => {}}
      />
    </>
  );
}

export default BoardSelector;
