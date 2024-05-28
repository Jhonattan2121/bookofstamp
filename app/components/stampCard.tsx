'use client'
import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Center,
    Flex,
    HStack,
    Image,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FaBitcoin } from "react-icons/fa";
import { StampInfo } from '../utils/getStampsInfo';
interface Holder {
    address: string;
    quantity: number;
}
interface StampCardProps {
    stampInfo: StampInfo | null;
    stampId: string;
}

const StampCard: React.FC<StampCardProps> = ({ stampInfo, stampId }) => {
    if (!stampInfo) {
        return <Text>Error loading stamp information.</Text>;
    }

    return (
        <Flex justify="center">
            <Card
                bg={"black"}
                border={"0.6px solid "}
                size="sm"
                boxShadow="none"
                p={2}
                minW="300px"
                borderRadius="10px"
                _hover={{
                    boxShadow: "0 0 5px 3px grey",
                    transform: "scale(1.0002)",
                    transition: "transform 0.2s"
                }}

            >
                <CardHeader borderTopRadius="10px" textAlign="center" bg="gray.900" p={2}>
                    <HStack justify={"center"}>
                        <Image src='http://localhost:3000/walletIcon.webp' alt="Logo" boxSize="20px" />
                        <Text size="md" color="grey.200">{stampId}</Text>
                    </HStack>
                </CardHeader>
                <Box border={"0.6px solid grey"} borderRadius="10px" p={10} >
                    <CardBody
                        bg={"transparent"}
                    >
                        <Center >
                            <Image
                                src={stampInfo.stamp_url}
                                alt={'stamp'}
                                boxSize="240px"
                                borderRadius="10px"
                                borderWidth="2px"
                                borderColor="yellow"
                            />
                        </Center>
                    </CardBody>
                    <Center>
                        <CardFooter mb={-5}>
                            <VStack>

                                <Box borderWidth="1px" borderRadius="10px" p={3} >
                                    <Text color={"grey"} fontSize="md"><strong>CPID:</strong> {stampInfo.cpid}</Text>
                                    <Text color={"grey"} fontSize="md"><strong>Block Index:</strong> {stampInfo.block_index}</Text>
                                    <Text color={"grey"} fontSize="md"><strong>Supply:</strong> {stampInfo.supply}</Text>
                                </Box>
                                <Button
                                    leftIcon={
                                        <FaBitcoin size={"22px"} />
                                    }

                                    colorScheme="orange"
                                    size="sm"
                                    mt={2}
                                    variant={'outline'}
                                    w={'100%'}
                                >
                                    Dispensers
                                </Button>
                            </VStack>
                        </CardFooter>
                    </Center>
                </Box>
            </Card>
        </Flex>
    )
}

export default StampCard;



{/* <VStack align="start" w="100%">
                        <Button onClick={onToggle} mt={4} colorScheme="yellow" size="sm">
                            {isOpen ? "Hide Holders" : "Show Holders"}
                        </Button>
                        <Collapse in={isOpen} animateOpacity>
                            <Box mt={4} w="100%">
                                <Heading size="xs" color="yellow.400">Holders:</Heading>
                                <Table variant="simple" colorScheme="yellow" mt={2}>
                                    <Tbody>
                                        {holders.map((holder, index) => (
                                            <Tr key={index}>
                                                <Td>
                                                    <a href={`https://www.blockchain.com/btc/address/${holder.address}`} target="_blank" rel="noopener noreferrer" style={{ color: 'yellow.300', fontSize: '0.8em' }}>
                                                        {holder.address}
                                                    </a>
                                                </Td>
                                                <Td fontSize="0.8em">{holder.quantity}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </Collapse>
                    </VStack>
                    */}