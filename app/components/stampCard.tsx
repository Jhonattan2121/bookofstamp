'use client';
import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Skeleton, SkeletonText, Text, VStack, useToast } from '@chakra-ui/react';
import QRCode from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { FaArrowDown, FaBitcoin, FaCopy } from "react-icons/fa";
import '../styles.css';
import formatBTCaddress from '../utils/formatBTCaddress';
import getStampData, { Dispenser, StampInfoResponse } from '../utils/getStampInfo';
import PepeToast from '../utils/pepeToast';
import { chapter1StampIds, chapter2StampIds, chapter3StampIds, chapter4StampIds } from '../utils/stampIDs';
import DispenserModal from './dispenserModal';

interface StampCardProps {
    stampId: string;
}

const useIntersectionObserver = (options: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsInView(entry.isIntersecting);
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return { ref, isInView };
};

const getStampDetails = (stampId: string) => {
    const allChapters = [...chapter1StampIds, ...chapter2StampIds, ...chapter3StampIds, ...chapter4StampIds];
    const stampDetails = allChapters.find(stamp => stamp.cpid === stampId);

    if (!stampDetails) {
        console.error(`No stamp details found for stampId: ${stampId}`);
    } else {
        console.log(`Stamp details found for stampId: ${stampId}`, stampDetails);
    }

    // Check for duplicates
    const duplicates = allChapters.filter(stamp => stamp.cpid === stampId);
    if (duplicates.length > 1) {
        console.warn(`Duplicate cpid found for stampId: ${stampId}`, duplicates);
    }

    return stampDetails;
};

const flipCardStyles = {
    perspective: '1000px',
};

const flipCardInnerStyles = {
    position: 'relative',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
};

const flipCardFlippedStyles = {
    transform: 'rotateY(180deg)',
};

const flipCardSideStyles = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    willChange: 'transform',
};

const flipCardBackStyles = {
    transform: 'rotateY(180deg)',
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

    const { ref, isInView } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '0px',
    });

    const stampDetails = getStampDetails(stampId);
    console.log('Stamp Details:', stampDetails); // Debug statement

    useEffect(() => {
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
    }, [stampId]);

    useEffect(() => {
        if (stampData?.dispensers && stampData.dispensers.length > 0) {
            const sortedDispensers = [...stampData.dispensers].sort((a, b) => parseFloat(a.btcrate.toString()) - parseFloat(b.btcrate.toString()));
            setDispensers(sortedDispensers);
            setSelectedDispenser(sortedDispensers[0]);
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

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click is outside the interactive elements
        if (!(e.target instanceof HTMLElement)) return;
        const interactiveElements = ['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A'];
        if (interactiveElements.includes(e.target.tagName)) {
            return;
        }
        console.log(stampData);
        setIsFlipped(!isFlipped);
    };

    if (error) {
        return <Text>{error}</Text>;
    }



    return (
        <Flex justify="center" width="100%" height="100%" p={[2, 4]} marginTop="80px">
            {isDispenserOpen &&
                <DispenserModal stampData={stampData} isOpen={isDispenserOpen} onClose={() => setIsDispenserOpen(false)} />
            }
            <Box
                sx={flipCardStyles}
                width="310px"
                height="550px"
                onClick={handleClick}
            >
                <Box
                    sx={{ ...flipCardInnerStyles, ...(isFlipped && flipCardFlippedStyles) }}
                >
                    <Card
                        sx={flipCardSideStyles}
                        bg={"black"}
                        border={"2px solid white"}
                        size="sm"
                        color={"white"}
                        boxShadow="inset 0 0 30px #333, inset 10px 0 40px black, inset -10px 0 40px #003366, inset 10px 0 150px black, inset -10px 0 150px green, 0 0 30px #333, -5px 0 300px orange, 5px 0 40px #004d00"
                        p={2}
                        borderRadius="20px"
                        width="100%"
                        height="100%"
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
                                                Buy Art
                                            </Button>
                                        </VStack>
                                    </CardFooter>
                                )
                            )}
                        </Box>
                    </Card>
                    <Card
                        sx={{ ...flipCardSideStyles, ...flipCardBackStyles }}
                        bg={"black"}
                        border={"2px solid white"}
                        size="sm"
                        color={"white"}
                        p={2}
                        borderRadius="20px"
                        width="100%"
                        height="100%"
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
                            <VStack zIndex={9999} spacing={1} mt="30px"  >
                                {dispensers.length === 0 ? (
                                    <>
                                        <Image src="https://i.pinimg.com/originals/f2/69/72/f26972dfbe5f8226b76ac7bca928c82b.gif" alt="No Dispensers" />
                                        <Text fontSize="md" color="white">
                                            No dispensers available, or may be its loading...
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
                                                <HStack>

                                                    <Badge bg={"orange.200"} color={"black"} className='btc-price'><Text fontSize={"18px"}> {selectedDispenser.btcrate} BTC</Text></Badge> <Text>-</Text>
                                                    <Text>  {selectedDispenser.give_remaining}/{selectedDispenser.escrow_quantity}left</Text>
                                                </HStack>

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
                </Box>
            </Box>
        </Flex>
    );
}

export default StampCard;
