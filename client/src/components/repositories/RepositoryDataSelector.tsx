import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  name: string
}

function RepositoryDataSelector({ name }: Props) {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {name}
      </MenuButton>
      <MenuList zIndex={2}>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuDivider />
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}

export default RepositoryDataSelector;
