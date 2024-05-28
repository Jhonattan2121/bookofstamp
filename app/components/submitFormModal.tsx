import {
    Button,
    Center,
    FormControl,
    FormLabel,
    Image,
    Input, InputGroup,
    InputLeftElement,
    Modal, ModalBody, ModalCloseButton, ModalContent,
    ModalFooter,
    ModalHeader, ModalOverlay,
    Text,
    VStack
} from '@chakra-ui/react';
import React from 'react';

interface SubmitFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubmitFormModal: React.FC<SubmitFormModalProps> = ({ isOpen, onClose }) => {
    const handleClose = () => {
        onClose();
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        console.log(key, e.target.value);
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
                            Submit Stamp Art
                        </Text>
                    </Center>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4}>
                        <Image
                            src="https://stampchain.io/stamps/e16b151228f959a8c91251eec63b390326960c4adbc85b90f1d556454b549e19.png"
                            alt="skateboard"
                            boxSize={["80px", "160px"]}
                        />
                        <FormControl>
                            <FormLabel color="white">Artist Name</FormLabel>
                            <InputGroup>
                                <Input
                                    className='input'
                                    onChange={(e) => handleChange(e, "name")}
                                    bg="gray.800"
                                    color="white"
                                    borderColor="gray.600"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel color="white">Telegram Username</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" children="@" color="gray.400" />
                                <Input
                                    placeholder=' (e.g. @kevin) '
                                    className='input'
                                    onChange={(e) => handleChange(e, "filmmaker")}
                                    bg="gray.800"
                                    color="white"
                                    borderColor="gray.600"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel color="white">Asset Name</FormLabel>
                            <InputGroup>
                                <Input
                                    placeholder='(e.g A808011111111111111)'
                                    className='input'
                                    onChange={(e) => handleChange(e, "friends")}
                                    bg="gray.800"
                                    color="white"
                                    borderColor="gray.600"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </InputGroup>
                        </FormControl>
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

export default SubmitFormModal;
