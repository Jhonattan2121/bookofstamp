'use client'

import { Box, Flex, Text, Button, Image, useDisclosure } from '@chakra-ui/react';
import SubmitFormModal from './submitFormModal';
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Flex as="nav" className="navbar" borderRadius={5} border={"1px solid white"}>
            <SubmitFormModal isOpen={isOpen} onClose={onClose} />
            <Text fontSize="xl" fontWeight="bold">
                The Book of Stamp
            </Text>
            <Button className="navbar-button" onClick={onOpen}>
                Submit Art
            </Button>
        </Flex>
    )
}

export default Navbar;