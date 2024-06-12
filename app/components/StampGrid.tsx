'use client';
import { Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import StampCard from './stampCard';

interface StampGridProps {
    stampIds: string[];
}

const StampGrid: React.FC<StampGridProps> = ({ stampIds }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Center mt={10}>
                <VStack>
                    <Image
                        src="https://www.gifcen.com/wp-content/uploads/2022/03/pepe-the-frog-gif-1.gif"
                        alt="Loading..."
                        boxSize="200px"
                    />
                    <Text fontSize="48px">Loading...</Text>
                </VStack>
            </Center>
        );
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Box zIndex={0} mx={8}>
            <Flex wrap="wrap" justify="center" gap={6}>
                {stampIds.map((stampId) => (
                    <Box key={stampId} flexBasis={{ base: '100%', sm: '45%', md: '30%' }}>
                        <StampCard stampId={stampId} />
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default StampGrid;
