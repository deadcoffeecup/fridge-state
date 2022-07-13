import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { AddForm } from './AddForm';
import { AddByBarcode } from './AddByBarcode';
import AddByPhoto from './AddByPhoto';

export default function AddModal({ setIsModalOpened, products, handleAdd }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScanning, setIsScanning] = useState(false);

  return (
    <>
      <Button
        colorScheme={'teal'}
        size={'md'}
        mt={4}
        onClick={() => {
          setIsModalOpened((prev) => !prev);
          onOpen();
        }}
      >
        Add new product to fridge
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>
            Add Product by providing data
            <br /> or Scan its barcode
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!isScanning && (
              <AddForm handleAdd={handleAdd} products={products} />
            )}

            {isScanning && (
              <>
                <AddByPhoto />
                <AddByBarcode handleAdd={handleAdd} products={products} />
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Flex width={'100%'} justifyContent={'center'}>
              <Button
                colorScheme={'teal'}
                onClick={() => setIsScanning((prev) => !prev)}
              >
                {!isScanning ? 'Scan' : 'Hide Scanner'}
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
