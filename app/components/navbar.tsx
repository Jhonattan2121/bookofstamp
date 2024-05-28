'use client'

import { Button, Flex, Spacer, useDisclosure } from '@chakra-ui/react';
import SubmitFormModal from './submitFormModal';
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Flex
                as="nav"
                bg="transparent"
                padding={4}
                borderRadius={5}
                align="center"
                m={-20}
                justify="space-between"
            >
                {/* <Text fontSize="xl" fontWeight="bold" ml={4}>
                    Book of Stamp
                </Text> */}
                <Spacer />
                <SubmitFormModal isOpen={isOpen} onClose={onClose} />
                <Button
                    onClick={onOpen}
                    color={'black'}
                    variant={'outline'}
                    _hover={{ transform: "scale(1.05)" }}
                    h={'auto'}
                    fontSize={'48px'}
                >
                    Submit Art
                </Button>

                {/* 
                <Menu>
                    <MenuButton>
                        <Text color={'white'} fontSize="lg" fontWeight="bold">
                            Menu
                        </Text>

                    </MenuButton>
                    <MenuList
                        bg={"black"}>
                        <MenuItem
                            bg={"black"}>
                            Curse on X</MenuItem>
                        <MenuItem bg={"black"}>Punch EV</MenuItem>
                        <MenuItem bg={"black"}>Buy a Dao</MenuItem>
                        <MenuItem bg={"black"}>Do a KickFlip</MenuItem>
                        <MenuItem bg={"black"}>Fart</MenuItem >
                    </MenuList >

                </Menu >
 */}

            </Flex >
        </>
    )
}

export default Navbar;
