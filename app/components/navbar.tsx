'use client'

import { Flex, Spacer, Text } from '@chakra-ui/react';

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

            </Flex>
        </>
    )
}

export default Navbar;
