import {
    Box,
    Button,
    Center,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay,
    Text,
    VStack
} from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { FaArrowDown } from 'react-icons/fa';

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
    stampData: any;
    isOpen: boolean;
    onClose: () => void;
}

const DispenserModal: React.FC<DispenserModalProps> = ({ stampData, isOpen, onClose }) => {
    const [dispensers, setDispensers] = useState<Dispenser[]>([]);
    const [selectedDispenser, setSelectedDispenser] = useState<Dispenser | null>(null);

    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        if (stampData?.dispensers?.length > 0) {
            setDispensers(stampData.dispensers);
            setSelectedDispenser(stampData.dispensers[0]);
        }
    }, [stampData]);

    return (
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
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
                        <Text fontSize="4xl" fontWeight="bold" color="white">
                            Dispenser
                        </Text>
                    </Center>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <Center>
                        <Text fontSize="2xl" color="white">
                            {stampData?.stamp.title}
                        </Text>
                        <Image
                            src={stampData?.stamp.stamp_url || 'AZlogo.webp'}
                            alt={'stamp'}
                            boxSize="140px"
                            borderRadius="10px"
                            borderWidth="2px"
                            borderColor="yellow"
                            _hover={{
                                transform: "scale(1.02)",
                                transition: "transform 0.2s"
                            }}
                        />
                    </Center>

                    <VStack spacing={4}>
                        {dispensers.length === 0 ? (
                            <>
                                <Image src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="No Dispensers" />
                                <Text fontSize="md" color="white">
                                    No dispensers available
                                </Text>
                            </>
                        ) : (
                            <>
                                <Text fontSize="md" color="white">
                                    {dispensers.length} Dispensers available
                                </Text>
                                <Menu >
                                    <MenuButton as={Button} rightIcon={<FaArrowDown />} variant={'outline'} colorScheme="orange">
                                        Select Dispenser
                                    </MenuButton>
                                    <Center>
                                        <MenuList bg={'black'} border={'1px solid orange.200'} >
                                            {dispensers.map((dispenser, index) => (
                                                <MenuItem _hover={{ bg: 'orange', color: 'black' }} bg={'black'} key={index} onClick={() => setSelectedDispenser(dispenser)}>
                                                    {dispenser.source}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Center>
                                </Menu>
                                {selectedDispenser && (
                                    <Center mt={4}>
                                        <Box border={'1px solid orange'}>
                                            <QRCode value={selectedDispenser.source} size={200} bgColor="orange" fgColor="black" />
                                        </Box>
                                    </Center>
                                )}
                            </>
                        )}
                    </VStack>
                </ModalBody>
                {dispensers.length > 0 && (
                    <ModalFooter>

                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
}

export default DispenserModal;
