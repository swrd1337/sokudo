import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import DeleteConfirmation from '../../modals/DeleteConfirmation';

type Props = {
  onDelete: () => void
}

function TaskOptionsMenu({ onDelete }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          Actions
        </MenuButton>
        <MenuList>
          <MenuItem icon={<DeleteIcon />} onClick={onOpen}>
            Delete task
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirmClick={() => {
          onClose();
          onDelete();
        }}
      />
    </>
  );
}

export default TaskOptionsMenu;
