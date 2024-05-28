'use client'

import { Button, Flex, Spacer, Text, useDisclosure } from '@chakra-ui/react';
import SubmitFormModal from './submitFormModal';

const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <SubmitFormModal isOpen={isOpen} onClose={onClose} />

            <Flex
                as="nav"
                bg="gray"
                color="white"
                padding={4}
                borderRadius={5}
                border="1px solid white"
                align="center"
                justify="space-between"
                boxShadow="md"
            >
                <Text fontSize="xl" fontWeight="bold" ml={4}>
                    Book of Stamp
                </Text>
                <Spacer />
                <Button
                    onClick={onOpen}
                    bg="green.500"
                    color="white"
                    _hover={{ bg: "green.400", transform: "scale(1.05)" }}
                    mr={4}
                >
                    Submit Art
                </Button>
            </Flex>
        </>
    )
}

export default Navbar;
