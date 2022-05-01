import { DeleteIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  columnName: string,
  onDelete: (_name: string) => void
}

function BoardMenu({ columnName, onDelete }: Props) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="ghost"
        minW="1.8em"
        h="1.8em"
      />
      <MenuList>
        <MenuItem icon={<DeleteIcon />} onClick={() => onDelete(columnName)}>
          Delete column
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default BoardMenu;
