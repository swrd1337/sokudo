import React from 'react';
import ModalBase from './ModalBase';

type Props = {
  isOpen: boolean,
  onClose(): void,
  onConfirmClick(): void,
}

function CreateTaskConfirmation({ isOpen, onClose, onConfirmClick }: Props) {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      onConfirmClick={onConfirmClick}
      title="Create"
      body="Are you sure you want to create a new task?"
      baseColor="green"
    />
  );
}

export default CreateTaskConfirmation;
