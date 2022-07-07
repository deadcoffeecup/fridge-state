import { useRef, useState } from 'react';

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
  Flex,
} from '@chakra-ui/react';

export default function AddBtn({ categoryRef, nameRef, tag, setTag }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [error, setError] = useState('');
  const okRef = useRef();

  return (
    <>
      <Flex
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        position={'relative'}
        marginBottom={6}
        onMouseEnter={() => {
          if (!tag || !nameRef.current.value || !categoryRef.current.value) {
            setError('you need to provide all data');
          }
        }}
        onMouseLeave={() => {
          setError('');
        }}
      >
        <Box>
          <Button
            disabled={
              !tag || !nameRef.current.value || !categoryRef.current.value
            }
            borderRadius={'xl'}
            size={'sm'}
            colorScheme={'teal'}
            onClick={onOpen}
            type='submit'
          >
            Add
          </Button>
        </Box>
        <Box
          width={200}
          noOfLines={1}
          color={'red.400'}
          position={'absolute'}
          bottom={-6}
        >
          {error}
        </Box>
      </Flex>

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
