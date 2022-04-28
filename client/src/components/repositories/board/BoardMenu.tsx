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
        width="0.5em"
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
