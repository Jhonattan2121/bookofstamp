import {
    Button,
    Center,
    Image,
    Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';

export interface Dispenser {
    tx_hash: string;
    block_index: number;
    source: string;
    cpid: string;
    give_quantity: number;
}

export interface Dispense {
    block_index: number;
    cpid: string;
    destination: string;
    dispense_quantity: number;
    dispenser_tx_hash: string;
    source: string;
    tx_hash: string;
}


interface DispenserModalProps {
    // type stampData as the data inside StampInfoResponse 
    stampData: any;
    isOpen: boolean;
    onClose: () => void;
}

const DispenserModal: React.FC<DispenserModalProps> = ({ stampData, isOpen, onClose }) => {
    const handleClose = () => {
        onClose();
    }

    return (
        <Modal isCentered
            isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent
                bg="black"
                border="0.6px solid grey"
                maxH="80vh"
                overflowY="auto"
                maxW="600px"
                w="90%"
            >
                <ModalHeader>
                    <Center>
                        <Text fontSize="xl" fontWeight="bold" color="white">
                            Dispenser
                        </Text>
                    </Center>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4}>
                        <Image
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgegRp7CCBl0yln6jta61xEn0rvny1b1fyaw&s"
                            alt="skateboard"
                            boxSize={["80px", "160px"]}
                        />

                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Center w="100%">
                        <Button
                            variant="solid"
                            bg="green.500"
                            color="white"
                            size="lg"
                            w="100%"
                            maxW="200px"
                            _hover={{ bg: "green.400", transform: "scale(1.05)" }}
                            onClick={handleClose}
                        >
                            Submit Stamp
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default DispenserModal;
