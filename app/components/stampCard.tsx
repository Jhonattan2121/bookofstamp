'use client'
import {
    Box,
    Text,
    Image,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    useDisclosure,
    Flex,
    Center,
    Divider
} from '@chakra-ui/react';
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
            >
                <CardHeader textAlign="center" bg="gray.900" p={2}>
                    <Heading size="md" color="yellow.400">{stampId}</Heading>
                </CardHeader>
                <Divider />
                <Box border={"0.6px solid grey"} borderRadius="10px" p={10} >
                    <CardBody bg="gray.800" p={4}>
                        <Center>
                            <Image
                                src={stampInfo.stamp_url}
                                alt={'stamp'}
                                boxSize="200px"
                                borderRadius="10px"
                                borderWidth="2px"
                                borderColor="yellow.400"
                            />
                        </Center>
                    </CardBody>
                    <Center>
                        <CardFooter p={4} >
                            <Box borderWidth="1px" borderRadius="10px" p={4} >
                                <Text fontSize="sm"><strong>CPID:</strong> {stampInfo.cpid}</Text>
                                <Text fontSize="sm"><strong>Block Index:</strong> {stampInfo.block_index}</Text>
                                <Text fontSize="sm"><strong>Supply:</strong> {stampInfo.supply}</Text>
                            </Box>
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