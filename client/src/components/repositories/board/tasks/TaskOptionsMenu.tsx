import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  onDelete: () => void
}

function TaskOptionsMenu({ onDelete }: Props) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem icon={<DeleteIcon />} onClick={onDelete}>
          Delete task
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default TaskOptionsMenu;
