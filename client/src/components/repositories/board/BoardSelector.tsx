import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button, Menu, MenuButton, MenuDivider, MenuItem, MenuList,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  name: string
}

function BoardSelector({ name }: Props) {
  return (
    <Menu flip isLazy>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="outline" mr={2}>
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

export default BoardSelector;
