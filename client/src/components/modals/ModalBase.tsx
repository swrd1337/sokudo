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
  title: string,
  body: string,
  baseColor: string,
}

function ModalBase({
  isOpen, onClose, onConfirmClick, title, body, baseColor,
}: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={`${baseColor}.200`}>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody borderTop="1px solid" borderColor="gray.600">
          <FormControl>
            <Text fontSize="lg">{body}</Text>
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
          <Button variant="ghost" colorScheme={baseColor} onClick={onConfirmClick}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalBase;
