'use client'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText, Text, VStack, useToast } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaArrowDown, FaBitcoin, FaCopy } from "react-icons/fa";
import formatBTCaddress from '../utils/formatBTCaddress';
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
    const toast = useToast();

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

    const CustomToast = ({ title, description }: { title: string, description: string }) => (
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

    const handleCopyAddress = (address: string) => {
        navigator.clipboard.writeText(address);
        toast({
            render: () => <CustomToast title="Address copied." description="The wallet address has been copied to your clipboard." />,
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    };



    if (error) {
        return <Text>{error}</Text>;
    }

    return (
        <Flex ref={cardRef} justify="center" width="100%" height="100%" p={[2, 4]} marginTop="80px">
            {isDispenserOpen &&
                <DispenserModal stampData={stampData} isOpen={isDispenserOpen} onClose={() => setIsDispenserOpen(false)} />
            }
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card
                    bg={"black"}
                    border={"0.6px solid orange "}
                    size="sm"
                    boxShadow="none"
                    p={2}
                    borderRadius="10px"
                    width="350px"
                    height="550px"
                >
                    <CardHeader borderTopRadius="10px" textAlign="center" bg="gray.900" p={2}>
                        <HStack justify={"center"}>
                            <Image src='walletIcon.webp' alt="Logo" boxSize="20px" />
                            <Text size="md" color="grey.200">{stampId}</Text>
                        </HStack>
                    </CardHeader>
                    <Box borderRadius="10px" p={[10, 4]}>
                        <CardBody bg={"transparent"}>
                            <Center>
                                {loading ? (
                                    <Skeleton boxSize={["200px", "220px"]} borderRadius="10px" />
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

                <Card
                    bg={"black"}
                    border={"0.6px solid orange "}
                    size="sm"
                    boxShadow="none"
                    borderRadius="10px"
                    width="350px"
                    height="550px"
                >
                    <CardHeader borderTopRadius="10px" textAlign="center" bg="gray.900" p={2}>
                        <HStack justify={"center"}>
                            <Image
                                src={stampData?.stamp.stamp_url || 'AZlogo.webp'}
                                alt={'stamp'}
                                boxSize="35px"
                                borderWidth="2px"
                                borderColor="yellow"
                                position="relative"
                                _hover={{
                                    transform: "scale(1.02)",
                                    transition: "transform 0.2s"
                                }}
                            />
                            <Text size="md" color="grey.200">{stampId}</Text>
                        </HStack>
                    </CardHeader>
                    <CardBody
                        textAlign="center"
                        width="100%"
                        height="100%"
                        borderRadius="20px"
                    >
                        <VStack spacing={1} mt="30px"  >
                            {dispensers.length === 0 ? (
                                <>
                                    <Image src="https://i.pinimg.com/originals/f2/69/72/f26972dfbe5f8226b76ac7bca928c82b.gif" alt="No Dispensers" />
                                    <Text fontSize="md" color="white">
                                        No dispensers available
                                    </Text>
                                </>
                            ) : (
                                <>
                                    <Text fontSize="xl" color="white" mt="-32px">
                                        {dispensers.length}
                                    </Text>
                                    Dispensers available
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<FaArrowDown />}
                                            variant="outline"
                                            colorScheme="orange"
                                            size="md"
                                            borderRadius="10px"
                                            _hover={{ bg: 'orange.300' }}
                                        >
                                            Select Dispenser
                                        </MenuButton>
                                        <MenuList
                                            bg="black"
                                            border="1px solid orange"
                                            borderRadius="10px"
                                            color="white"
                                            w="100%"
                                        >
                                            {dispensers.map((dispenser, index) => (
                                                <MenuItem
                                                    bg="black"
                                                    key={index}
                                                    _hover={{ bg: 'orange.300', color: 'black' }}
                                                    onClick={() => setSelectedDispenser(dispenser)}
                                                    cursor="pointer"
                                                    p="2"
                                                >
                                                    {formatBTCaddress(dispenser.source)}
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>

                                    {selectedDispenser && dispensers.length > 0 && (
                                        <VStack mt={4}>
                                            <HStack>
                                                <Text fontSize="md" color="white">
                                                    {formatBTCaddress(selectedDispenser.source)}
                                                </Text>
                                                <FaCopy size="20px" color="orange" cursor="pointer" onClick={() => handleCopyAddress(selectedDispenser.source)} />
                                            </HStack>
                                            <Box border={'1px solid orange'} borderRadius="10px" p="10px">
                                                <QRCode value={selectedDispenser.source} size={200} bgColor="orange" fgColor="black" />
                                            </Box>
                                        </VStack>
                                    )}
                                </>
                            )}
                        </VStack>
                    </CardBody>
                    <CardFooter>
                        <Button
                            leftIcon={<FaArrowDown />}
                            colorScheme="orange"
                            size="sm"
                            variant={'outline'}
                            w={'auto'}
                            onClick={() => setIsFlipped(false)}
                        >
                            Back
                        </Button>
                    </CardFooter>
                </Card>
            </ReactCardFlip>
        </Flex>
    );
}

export default StampCard;
