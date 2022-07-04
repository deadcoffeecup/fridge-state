import { useRef } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  AlertDialogCloseButton,
  Button,
  Box,
  Heading,
} from '@chakra-ui/react';

export default function AddBtn({ tag, setTag }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const okRef = useRef();

  return (
    <>
      <Button
        disabled={!tag}
        borderRadius={'xl'}
        size={'sm'}
        colorScheme={'teal'}
        onClick={onOpen}
        type='submit'
      >
        Add
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={okRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Add this tag </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            to make it easier for you to distinguish one from the other
            <Heading>{tag}</Heading>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              as={Box}
              ref={okRef}
              size={'sm'}
              onClick={() => {
                onClose();
                setTag('');
              }}
            >
              OK
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
