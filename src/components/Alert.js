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
  Flex,
} from '@chakra-ui/react';

export default function Alert({ setIsAlertOpened, handleFlag, product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const handleClick = (mode) => {
    handleFlag(product, mode);
    onClose();
  };

  return (
    <Flex justifyContent={'flex-end'}>
      <Button
        colorScheme={'teal'}
        size={'xs'}
        as={Box}
        borderRadius={'xl'}
        onClick={() => {
          setIsAlertOpened((prev) => !prev);
          onOpen();
        }}
      >
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
          <AlertDialogBody>Have you eaten or wasted it? </AlertDialogBody>
          <AlertDialogFooter>
            <Button as={Box} ref={cancelRef} size={'sm'} onClick={onClose}>
              Cancel
            </Button>
            <Button
              as={Box}
              size={'sm'}
              borderRadius={'xl'}
              onClick={() => handleClick('isEaten')}
              colorScheme='green'
              ml={3}
            >
              Eat
            </Button>
            <Button
              as={Box}
              size={'sm'}
              borderRadius={'xl'}
              onClick={() => handleClick('isWasted')}
              colorScheme='red'
              ml={3}
            >
              Waste
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Flex>
  );
}
