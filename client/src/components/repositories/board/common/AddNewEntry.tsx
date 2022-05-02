import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
  ButtonGroup, IconButton, Input, VStack,
} from '@chakra-ui/react';
import React, { FormEvent } from 'react';

type Props = {
  onInputChange: (_e: FormEvent<HTMLInputElement>) => void
  onSubmit: () => void
  onCancel: () => void,
  value: string,
  width?: string,
  isInvalid?: boolean,
}

function AddNewEntry({
  onInputChange, onSubmit, onCancel, width, isInvalid, value,
}: Props) {
  return (
    <VStack alignItems="end" w={width}>
      <Input
        placeholder="Name"
        minW={52}
        focusBorderColor="purple.400"
        onChange={onInputChange}
        isInvalid={isInvalid}
        value={value}
        autoFocus
      />
      <ButtonGroup variant="outline" spacing="2">
        <IconButton
          variant="outline"
          aria-label="Close"
          icon={<CloseIcon color="gray.300" w="3" h="3" />}
          onClick={onCancel}
        />
        <IconButton
          variant="outline"
          aria-label="Save"
          icon={<CheckIcon color="green.300" />}
          onClick={onSubmit}
        />
      </ButtonGroup>
    </VStack>
  );
}

AddNewEntry.defaultProps = {
  isInvalid: false,
  width: 'unset',
};

export default AddNewEntry;
