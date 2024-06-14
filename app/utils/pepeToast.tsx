// components/CustomToast.tsx

import { Box, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';

interface CustomToastProps {
    title: string;
    description: string;
}

const PepeToast: React.FC<CustomToastProps> = ({ title, description }) => (
    <Box
        bg="black"
        color="orange"
        border="1px solid orange"
        borderRadius="10px"
        p={4}
        shadow="md"
    >
        <HStack>
            <Image src='https://i.pinimg.com/originals/f2/69/72/f26972dfbe5f8226b76ac7bca928c82b.gif' alt="Logo" boxSize="30px" />
            <Box>
                <Text fontWeight="bold">{title}</Text>
                <Text>{description}</Text>
            </Box>
        </HStack>
    </Box>
);

export default PepeToast;
