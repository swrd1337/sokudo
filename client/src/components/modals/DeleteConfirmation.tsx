import {
  Button,
  FormControl, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

type Props = {
  isOpen: boolean,
  onClose(): void,
  onConfirmClick(): void,
}

function DeleteConfirmation({ isOpen, onClose, onConfirmClick }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="red.200">Delete</ModalHeader>
        <ModalCloseButton />
        <ModalBody borderTop="1px solid" borderColor="gray.600">
          <FormControl>
            <Text fontSize="lg">Are you sure you want to delete?</Text>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={onClose}
            variant="ghost"
            color="gray.300"
          >
            Close
          </Button>
          <Button variant="ghost" colorScheme="red" onClick={onConfirmClick}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeleteConfirmation;
