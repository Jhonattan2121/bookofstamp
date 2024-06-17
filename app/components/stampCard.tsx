// components/StampCard.tsx

'use client';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText, Text, VStack, useToast } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useEffect, useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { FaArrowDown, FaBitcoin, FaCopy } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';
import formatBTCaddress from '../utils/formatBTCaddress';
import getStampData, { StampInfoResponse } from '../utils/getStampInfo';
import PepeToast from '../utils/pepeToast';
import { chapter1StampIds, chapter2StampIds, chapter3StampIds } from '../utils/stampIDs';
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

const getStampDetails = (stampId: string) => {
    const allChapters = [...chapter1StampIds, ...chapter2StampIds, ...chapter3StampIds];
    return allChapters.find(stamp => stamp.cpid === stampId);
};

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

    const stampDetails = getStampDetails(stampId);

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

    const handleCopyAddress = (address: string) => {
        navigator.clipboard.writeText(address);
        toast({
            render: () => <PepeToast title="Pepe Says" description="Sucessfully copied, bro" />,
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
                    border={"2px solid white"}
                    size="sm"
                    color={"white"}
                    boxShadow="inset 0 0 30px #333, inset 10px 0 40px black, inset -10px 0 40px #003366, inset 10px 0 150px black, inset -10px 0 150px green, 0 0 30px #333, -5px 0 300px orange, 5px 0 40px #004d00"
                    p={2}
                    borderRadius="20px"
                    width="310px"
                    height="550px"
                    transition="transform 0.3s"
                >
                    <CardHeader borderBottom={"1px solid white"} borderTopRadius="10px" textAlign="center" bg="orange.300" p={2}>
                        <HStack justify={"center"}>
                            <Image src='walletIcon.webp' alt="Logo" boxSize="20px" />
                            <Text fontWeight={"bold"} fontSize={"18px"} color="black">Chapter {stampDetails?.chapter} - Page {stampDetails?.page} </Text>
                        </HStack>
                    </CardHeader>
                    <Box borderRadius="10px" p={4}>
                        <CardBody bg={"transparent"}>
                            <Center>
                                {loading ? (
                                    <Skeleton boxSize={["200px", "220px"]} borderRadius="10px" />
                                ) : (
                                    <Box
                                        aspectRatio={1}
                                    >
                                        <Image
                                            src={stampData?.stamp.stamp_url || 'AZlogo.webp'}
                                            alt={'stamp'}
                                            boxSize="240px"
                                            borderRadius="10px"
                                            borderWidth="2px"
                                            objectFit={"contain"}
                                            borderColor="yellow"
                                            // height={"100%"}
                                            // width={"auto"}
                                            style={{
                                                imageRendering: 'pixelated',
                                            }}

                                        />
                                    </Box>

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
                                            <Text color={"white"} fontSize="md"><strong>Artist: </strong> {stampDetails?.artist}</Text>
                                            <Text cursor={"pointer"} onClick={() => handleCopyAddress(stampData.stamp.cpid)} color={"white"} fontSize="md"> {stampData.stamp.cpid}</Text>
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
                    boxShadow="inset 0 0 30px #333, inset 10px 0 40px black, inset -10px 0 40px #003366, inset 10px 0 150px black, inset -10px 0 150px green, 0 0 30px #333, -5px 0 1000px orange, 5px 0 40px #004d00"
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
        </Flex >
    );
}

export default StampCard;
