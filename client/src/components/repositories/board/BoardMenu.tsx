import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import DeleteConfirmation from '../../modals/DeleteConfirmation';

type Props = {
  columnName: string,
  onDelete: (_name: string) => void
}

function BoardMenu({ columnName, onDelete }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Menu placement="left-start">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="ghost"
        minW={6}
        h={6}
      />
      <MenuList zIndex="100" borderWidth="2px" bgColor="gray.800">
        <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
          Delete column
        </MenuItem>
      </MenuList>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirmClick={() => {
          onClose();
          onDelete(columnName);
        }}
      />
    </Menu>
  );
}

export default BoardMenu;
