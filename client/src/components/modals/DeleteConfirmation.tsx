import React from 'react';
import ModalBase from './ModalBase';

type Props = {
  isOpen: boolean,
  onClose(): void,
  onConfirmClick(): void,
}

function DeleteConfirmation({ isOpen, onClose, onConfirmClick }: Props) {
  return (
    <ModalBase
      isOpen={isOpen}
      onClose={onClose}
      onConfirmClick={onConfirmClick}
      title="Delete"
      body="Are you sure you want to delete?"
      baseColor="red"
    />
  );
}

export default DeleteConfirmation;
