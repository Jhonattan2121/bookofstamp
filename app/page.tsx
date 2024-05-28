
'use client'
import { Box, Button, Center, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useDisclosure } from '@chakra-ui/react';
import StampGrid from './components/StampGrid';
import SubmitFormModal from './components/submitFormModal';
import { stamp_ids } from './utils/stampIDs';
const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();


  const chaptersList = [
    {
      id: 1,
      title: "Chapter 1",
      description: "Chapter 1 Description",
      stamp: "Stamp 1",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Chapter 2",
      description: "Chapter 2 Description",
      stamp: "Stamp 2",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Chapter 3",
      description: "Chapter 3 Description",
      stamp: "Stamp 3",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <Box m={20} p={5}>
      {/* <Cursor /> */}
      <Center>
        <SubmitFormModal isOpen={isOpen} onClose={onClose} />
        <HStack>
          <Image mb={10} boxSize="140px" src="walletIcon.webp" alt="Logo" className="navbar-logo" />
          <VStack>
            <Text ml={"5"} fontSize="5xl" fontWeight="bold" color="white">
              Book of Stamp
            </Text>
            <Menu     >
              <MenuButton ml={"5"} w={'90%'} as={Button} colorScheme="orange" variant="outline" >
                Chapters
              </MenuButton>
              <MenuList bg="orange">
                {chaptersList.map((chapter) => (
                  <MenuItem _hover={{ bg: 'black' }} bg="orange" key={chapter.id} value={chapter.stamp}>
                    {chapter.title}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>

          </VStack>
        </HStack>

      </Center>

      <StampGrid stampIds={stamp_ids} />
      <Center
        mt={10}
        _hover={{ transform: "scale(1.05)" }}
      >
        <Button
          onClick={onOpen}
          variant={'outline'}
          colorScheme='orange'
          _hover={{ transform: "scale(1.05)" }}
          h={'auto'}
          p={4}
          w={'100%'}
          fontSize={'48px'}
        >
          Submit Art
        </Button>
      </Center>
    </Box>
  );
}

export default HomePage;
