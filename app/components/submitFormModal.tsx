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
    VStack,
    useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import getStampData from '../utils/getStampInfo';
import PepeToast from '../utils/pepeToast';

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

    const [stampImage, setStampImage] = useState<string>("");
    const [isFetchingImage, setIsFetchingImage] = useState<boolean>(false);
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFormData({
            ...formData,
            [key]: e.target.value
        });
    };

    const getStampImage = async (stampId: string) => {
        try {
            setIsFetchingImage(true);
            const stampData = await getStampData(stampId);
            setStampImage(stampData.data.stamp.stamp_url);
            console.log(stampData);
        } catch (error) {
            console.error('Error fetching stamp image:', error);
        } finally {
            setIsFetchingImage(false);
        }
    };

    useEffect(() => {
        if (formData.cpid) {
            getStampImage(formData.cpid);
        }
    }, [formData.cpid]);

    const validateCpid = (cpid: string): boolean => {
        const cpidRegex = /^A\d{19}$/;
        return cpidRegex.test(cpid);
    };

    const handleSubmit = async () => {
        console.log(stampImage);
        if (!formData.artist || !formData.contact || !formData.cpid) {
            toast({
                render: () => <PepeToast title="Error" description="All fields must be filled." />,
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        if (!validateCpid(formData.cpid)) {
            toast({
                render: () => <PepeToast title="Error" description='Asset Name must start with "A" followed by 19 digits.' />,
                duration: 3000,
                isClosable: true,
                position: 'top',
            });
            return;
        }

        try {
            // Ensure the stamp image is fetched before submitting
            if (!stampImage) {
                await getStampImage(formData.cpid);
            }

            const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL;

            const webhookBody = {
                embeds: [{
                    title: '🐸  New Stamp Art Submission',
                    fields: [
                        { name: 'Artist Name', value: formData.artist },
                        { name: 'Telegram/Twitter/Discord Username', value: formData.contact },
                        { name: 'Asset Name', value: formData.cpid }
                    ],
                    image: {
                        url: stampImage
                    },
                    thumbnail: {
                        url: stampImage
                    },
                    footer: {
                        text: 'Submitted via Pepe Stamp Submission Form'
                    }
                }]
            };

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
                toast({
                    render: () => <PepeToast title="Success" description='Form submitted successfully!' />,
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
                setFormData({ artist: "", contact: "", cpid: "" }); // Reset the form
                onClose(); // Close the modal
            } else {
                toast({
                    render: () => <PepeToast title="Error" description='There was an error submitting the form. Please try again later.' />,
                    duration: 3000,
                    isClosable: true,
                    position: 'top',
                });
            }
        } catch (error) {
            console.error('Error submitting the form:', error);
            toast({
                render: () => <PepeToast title="Error" description='There was an error submitting the form. Please try again later.' />,
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
        }
    };

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
                        <Text mt={2} fontSize="lg" fontWeight="bold" color="white">
                            Submit Stamp - Chapter 5
                        </Text>
                    </Center>
                    <ModalCloseButton />
                </ModalHeader>
                <ModalBody>
                    <VStack spacing={4}>
                        <Image
                            src={stampImage || "https://i.pinimg.com/originals/97/69/10/976910c6d51c3cab7eb7aad4f2f610fe.gif"}
                            alt="stamp"
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
                            <FormLabel color="white">Discord/Telegram/Twitter </FormLabel>
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
                            isLoading={isFetchingImage} // Disable the button while fetching image
                        >
                            Submit Stamp
                        </Button>
                    </Center>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SubmitFormModal;
