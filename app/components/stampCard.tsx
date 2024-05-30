'use client'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, HStack, Image, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { FaBitcoin } from "react-icons/fa";
import getStampData, { StampInfoResponse } from '../utils/getStampInfo';
import DispenserModal from './dispenserModal';

interface StampCardProps {
    stampId: string;
}

const StampCard: React.FC<StampCardProps> = ({ stampId }) => {
    const [stampData, setStampData] = useState<StampInfoResponse['data'] | null>(null);
    const [isDispenserOpen, setIsDispenserOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            async ([entry]) => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    try {
                        const data = await getStampData(stampId);
                        setStampData(data.data);
                    } catch (err) {
                        setError('Failed to fetch stamp information.');
                    } finally {
                        setLoading(false);
                    }
                }
            },
            { threshold: 0.1 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [stampId]);

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Flex ref={cardRef} justify="center">
            <DispenserModal stampData={stampData} isOpen={isDispenserOpen} onClose={() => setIsDispenserOpen(false)} />
            <Card
                bg={"black"}
                border={"0.6px solid "}
                size="sm"
                boxShadow="none"
                p={2}
                minW="200px"
                borderRadius="10px"
            >
                <CardHeader borderTopRadius="10px" textAlign="center" bg="gray.900" p={2}>
                    <HStack justify={"center"}>
                        <Image src='walletIcon.webp' alt="Logo" boxSize="20px" />
                        <Text size="md" color="grey.200">{stampId}</Text>
                    </HStack>
                </CardHeader>
                <Box borderRadius="10px" p={10}>
                    <CardBody bg={"transparent"}>
                        <Center>
                            {loading ? (
                                <Skeleton boxSize="240px" borderRadius="10px" />
                            ) : (
                                <Image
                                    src={stampData?.stamp.stamp_url || 'AZlogo.webp'}
                                    alt={'stamp'}
                                    boxSize="240px"
                                    borderRadius="10px"
                                    borderWidth="2px"
                                    borderColor="yellow"
                                    _hover={{
                                        transform: "scale(1.02)",
                                        transition: "transform 0.2s"
                                    }}
                                />
                            )}
                        </Center>
                    </CardBody>
                    {loading ? (
                        <Box mt={4} p={3} height="145px">
                            <SkeletonText noOfLines={3} spacing="4" skeletonHeight="4" />
                            <Skeleton mt={2} height="35px" width="100px" />
                            <Skeleton mt={2} height="35px" width="100px" />
                        </Box>
                    ) : (
                        stampData && (
                            <Center>
                                <CardFooter mb={-5}>
                                    <VStack>
                                        <Box borderWidth="1px" borderRadius="10px" p={3}>
                                            <Text color={"grey"} fontSize="md"><strong>CPID:</strong> {stampData.stamp.cpid}</Text>
                                            <Text color={"grey"} fontSize="md"><strong>Block Index:</strong> {stampData.stamp.block_index}</Text>
                                            <Text color={"grey"} fontSize="md"><strong>Supply:</strong> {stampData.stamp.supply}</Text>
                                        </Box>
                                        <Button
                                            leftIcon={<FaBitcoin size={"22px"} />}
                                            colorScheme="orange"
                                            size="sm"
                                            mt={2}
                                            variant={'outline'}
                                            w={'auto'}
                                            onClick={() => setIsDispenserOpen(true)}
                                        >
                                            Dispensers
                                        </Button>
                                    </VStack>
                                </CardFooter>
                            </Center>
                        )
                    )}
                </Box>
            </Card>
        </Flex>
    );
}

export default StampCard;
