'use client'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText, Text, VStack } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaArrowDown, FaBitcoin } from "react-icons/fa";
import getStampData, { StampInfoResponse } from '../utils/getStampInfo';
import DispenserModal from './dispenserModal';

export interface Dispenser {
    tx_hash: string;
    block_index: number;
    source: string;
    cpid: string;
    give_quantity: number;
}
interface StampCardProps {
    stampId: string;
}

const StampCard: React.FC<StampCardProps> = ({ stampId }) => {
    const [stampData, setStampData] = useState<StampInfoResponse['data'] | null>(null);
    const [isDispenserOpen, setIsDispenserOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [dispensers, setDispensers] = useState<Dispenser[]>([]);
    const [selectedDispenser, setSelectedDispenser] = useState<Dispenser | null>(null);

    const cardWidth = "300px"; // Set a fixed width for the card

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

    useEffect(() => {
        if (stampData?.dispensers && stampData.dispensers.length > 0) {
            setDispensers(stampData.dispensers);
            setSelectedDispenser(stampData.dispensers[0]);
        }
    }, [stampData]);

    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Flex ref={cardRef} justify="center">
            {isDispenserOpen &&
                <DispenserModal stampData={stampData} isOpen={isDispenserOpen} onClose={() => setIsDispenserOpen(false)} />
            }
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                {/* Face Side */}
                <Card
                    bg={"black"}
                    border={"0.6px solid "}
                    size="sm"
                    boxShadow="none"
                    p={2}
                    minW={cardWidth} // Apply fixed width
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
                                                onClick={() => setIsFlipped(true)}
                                            >
                                                Buy Stamp
                                            </Button>
                                        </VStack>
                                    </CardFooter>
                                </Center>
                            )
                        )}
                    </Box>
                </Card>
                {/* Back Side */}
                <Card
                    bg={"black"}
                    border={"0.6px solid "}
                    size="sm"
                    boxShadow="none"
                    p={2}
                    minW={cardWidth} // Apply fixed width
                    borderRadius="10px"
                >
                    <CardBody bg={"transparent"} textAlign="center">
                        <Text color="white">Dispenser is now open!</Text>
                        <Center>

                            <Image
                                m={2}
                                src={stampData?.stamp.stamp_url || 'AZlogo.webp'}
                                alt={'stamp'}
                                boxSize="140px"
                                borderRadius="10px"
                                borderWidth="2px"
                                borderColor="yellow"
                                _hover={{
                                    transform: "scale(1.02)",
                                    transition: "transform 0.2s"
                                }}
                            />
                        </Center>
                        <VStack spacing={4}>
                            {dispensers.length === 0 ? (
                                <>
                                    <Image src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="No Dispensers" />
                                    <Text fontSize="md" color="white">
                                        No dispensers available
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text fontSize="md" color="white">
                                        {dispensers.length} Dispensers available
                                    </Text>
                                    <Menu >
                                        <MenuButton as={Button} rightIcon={<FaArrowDown />} variant={'outline'} colorScheme="orange">
                                            Select Dispenser
                                        </MenuButton>
                                        <Center>
                                            <MenuList bg={'black'} border={'1px solid orange.200'} >
                                                {dispensers.map((dispenser, index) => (
                                                    <MenuItem _hover={{ bg: 'orange', color: 'black' }} bg={'black'} key={index} onClick={() => setSelectedDispenser(dispenser)}>
                                                        {dispenser.source}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </Center>
                                    </Menu>
                                    {selectedDispenser && dispensers.length > 0 && (
                                        <Center mt={4}>
                                            <Box border={'1px solid orange'}>
                                                <QRCode value={selectedDispenser.source} size={200} bgColor="orange" fgColor="black" />
                                            </Box>
                                        </Center>
                                    )}
                                </>
                            )}
                        </VStack>
                        <Button onClick={() => setIsFlipped(false)} colorScheme="blue" mt={4}>Close</Button>
                    </CardBody>
                </Card>
            </ReactCardFlip>
        </Flex>
    );
}

export default StampCard;
