'use client'

import { Flex, Menu, MenuButton, MenuItem, MenuList, Spacer, Text } from '@chakra-ui/react';
const Navbar = () => {

    return (
        <>
            <Flex
                as="nav"
                bg="black"
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
            </Flex >
        </>
    )
}

export default Navbar;
