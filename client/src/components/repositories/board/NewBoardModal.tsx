import {
  Button,
  FormControl,
  FormLabel,
  Input, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, {
  FormEvent, useContext, useRef, useState,
} from 'react';
import { fetchCreateBoard } from '../../../api/boardApi';
import UserContext from '../../../context/UserContext';
import Board from '../../../utilities/types/Board';

type Props = {
  isOpen: boolean,
  repoId: number,
  onClose(): void,
  addBoard(_board: Board): void,
}

function NewBoardModal({
  isOpen, onClose, repoId, addBoard,
}: Props) {
  const { user } = useContext(UserContext);
  const initialRef = useRef<any>();
  const finalRef = useRef<any>();

  const [titleValue, setTitleValue] = useState<string>('');
  const [invalid, setInvalid] = useState<boolean>(false);

  const onInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value.length <= 32) {
      setTitleValue(value);
      if (invalid) {
        setInvalid(false);
      }
    }
  };

  const onSaveClick = async () => {
    const validTitle = titleValue.length > 0;
    if (validTitle) {
      setInvalid(false);
      setTitleValue('');
      const board = await fetchCreateBoard(titleValue, repoId, user!.accessToken);
      addBoard(board);
      onClose();
    } else {
      setInvalid(true);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="teal.200">Create new board</ModalHeader>
        <ModalCloseButton ref={finalRef} />
        <ModalBody borderTop="1px solid" borderColor="gray.600">
          <FormControl isInvalid={invalid}>
            <FormLabel>Board title: </FormLabel>
            <Input value={titleValue} ref={initialRef} placeholder="Awesome board..." onChange={onInputChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            onClick={() => {
              setInvalid(false);
              setTitleValue('');
              onClose();
            }}
            variant="ghost"
            color="gray.300"
          >
            Close
          </Button>
          <Button variant="ghost" colorScheme="teal" onClick={onSaveClick}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default NewBoardModal;
