'use client';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText, Text, VStack, useToast } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaArrowDown, FaBitcoin, FaCopy } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';
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
    const [dispensers, setDispensers] = useState<Dispenser[]>([]);
    const [selectedDispenser, setSelectedDispenser] = useState<Dispenser | null>(null);
    const toast = useToast();

    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            const fetchData = async () => {
                try {
                    const data = await getStampData(stampId);
                    setStampData(data.data);
                } catch (err) {
                    setError('Failed to fetch stamp information.');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [inView, stampId]);

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

    const formatDate = (date: string) => {
        const d = new Date(date);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return d.toLocaleDateString(undefined, options);
    }

    return (
        <Flex ref={ref} justify="center" width="100%" height="100%" p={[2, 4]} marginTop="80px">
            {isDispenserOpen &&
                <DispenserModal stampData={stampData} isOpen={isDispenserOpen} onClose={() => setIsDispenserOpen(false)} />
            }
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <Card
                    bg={"black"}
                    border={"2px solid white "}
                    size="sm"
                    color={"white"}
                    boxShadow="none"
                    p={2}
                    borderRadius="20px"
                    width="310px"
                    height="550px"
                    transition="transform 0.3s"
                >
                    <CardHeader borderBottom={"1px solid white"} borderTopRadius="10px" textAlign="center" bg="orange.300" p={2}>
                        <HStack justify={"center"}>
                            <Image src='walletIcon.webp' alt="Logo" boxSize="20px" />
                            <Text fontWeight={"bold"} fontSize={"24px"} color="black">Chapter X</Text>
                        </HStack>
                    </CardHeader>
                    <Box borderRadius="10px" p={4}>
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
                                <CardFooter mb={-5}>
                                    <VStack m={0} w={"100%"} >
                                        <Box borderWidth="1px" borderRadius="10px" p={3}>
                                            <Text color={"white"} fontSize="md"> {stampData.stamp.cpid}</Text>
                                            <Text color={"white"} fontSize="md"><strong>Block Index:</strong> {stampData.stamp.block_index}</Text>
                                            <Text color={"white"} fontSize="md"><strong>BlockTime:</strong> {formatDate(stampData.stamp.block_time)}</Text>
                                        </Box>
                                        <Button
                                            leftIcon={<FaBitcoin size={"22px"} />}
                                            colorScheme="yellow"
                                            width={"100%"}
                                            mt={2}
                                            variant={'outline'}
                                            w={'auto'}
                                            onClick={() => setIsFlipped(true)}
                                        >
                                            Buy Stamp
                                        </Button>
                                    </VStack>
                                </CardFooter>
                            )
                        )}
                    </Box>
                </Card>

                <Card
                    bg={"black"}
                    border={"2px solid white"}
                    size="sm"
                    color={"white"}
                    boxShadow="none"
                    p={2}
                    borderRadius="20px"
                    width="310px"
                    height="550px"
                    transition="transform 0.3s"
                >
                    <CardHeader borderBottom={'1px solid white'} borderTopRadius="10px" textAlign="center" bg="gray.900" p={2}>
                        <HStack justify={"center"}>
                            <Image
                                src={stampData?.stamp.stamp_url || 'AZlogo.webp'}
                                alt={'stamp'}
                                boxSize="20px"
                                borderWidth="2px"
                                borderColor="yellow"
                                position="relative"
                            />
                            <Text size="md" color="white">{stampId}</Text>
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
                                            colorScheme="yellow"
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
                            colorScheme="yellow"
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
