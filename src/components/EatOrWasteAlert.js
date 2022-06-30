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
} from '@chakra-ui/react';

export default function EatOrWasteAlert({ handleFlag, product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Button as={Box} size={'sm'} borderRadius={'xl'} onClick={onOpen}>
        Remove
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Wait a sec...</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>Did you eat or waste it? </AlertDialogBody>
          <AlertDialogFooter>
            <Button as={Box} ref={cancelRef} size={'sm'} onClick={onClose}>
              Cancel
            </Button>
            <Button
              as={Box}
              size={'sm'}
              borderRadius={'xl'}
              onClick={() => handleFlag(product, 'isEaten')}
              colorScheme='green'
              ml={3}
            >
              Eat
            </Button>
            <Button
              as={Box}
              size={'sm'}
              borderRadius={'xl'}
              onClick={() => handleFlag(product, 'isWasted')}
              colorScheme='red'
              ml={3}
            >
              Waste
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
