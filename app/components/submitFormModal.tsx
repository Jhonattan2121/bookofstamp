'use client'
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
import React, { useState } from 'react';

interface SubmitFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SubmitFormModal: React.FC<SubmitFormModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        artist: "",
        contact: "",
        cpid: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData({
            ...formData,
            [key]: e.target.value
        });
    }

    const handleSubmit = async () => {
        const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

        const webhookBody = {
            embeds: [{
                title: 'New Stamp Art Submission',
                fields: [
                    { name: 'Artist Name', value: formData.artist },
                    { name: 'Telegram/Twitter Username', value: formData.contact },
                    { name: 'Asset Name', value: formData.cpid }
                ],
                image: {
                    url: 'https://i.pinimg.com/originals/97/69/10/976910c6d51c3cab7eb7aad4f2f610fe.gif'
                }
            }]
        };


        try {
            if (!webhookUrl) {
                throw new Error('Webhook URL is undefined.');
            }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(webhookBody),
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({ artist: "", contact: "", cpid: "" }); // Reset the form
                onClose(); // Close the modal
            } else {
                alert('There was an error submitting the form. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('There was an error submitting the form. Please try again later.');
        }
    }

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
                        <Text fontSize="xl" fontWeight="bold" color="white">
                            Submit Stamp Art
                        </Text>
                    </Center>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4}>
                        <Image
                            src="https://i.pinimg.com/originals/97/69/10/976910c6d51c3cab7eb7aad4f2f610fe.gif"
                            alt="skateboard"
                            boxSize={["80px", "160px"]}
                        />
                        <FormControl>
                            <FormLabel color="white">Artist Name</FormLabel>
                            <InputGroup>
                                <Input
                                    value={formData.artist}
                                    onChange={(e) => handleChange(e, "artist")}
                                    bg="gray.800"
                                    color="white"
                                    borderColor="gray.600"
                                    _placeholder={{ color: 'gray.400' }}
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl>
                            <FormLabel color="white">Telegram/Twitter Username</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none" color="gray.400">
                                    @
                                </InputLeftElement>
                                <Input
                                    value={formData.contact}
                                    placeholder=' (e.g. @kevin) '
                                    onChange={(e) => handleChange(e, "contact")}
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
                                    value={formData.cpid}
                                    placeholder='(e.g A808011111111111111)'
                                    onChange={(e) => handleChange(e, "cpid")}
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
                            onClick={handleSubmit}
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
