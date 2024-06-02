
'use client'
import { Box, Button, Center, HStack, Image, Menu, MenuButton, MenuItem, MenuList, VStack, useDisclosure } from '@chakra-ui/react';
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
    <>
      <Box m={10} p={5}>
        <Center>
          <SubmitFormModal isOpen={isOpen} onClose={onClose} />
          <HStack>
            <Image mb={-3} boxSize="140px" src="AZlogo.webp" alt="Logo" className="navbar-logo" />
            <VStack>
              {/* <Text ml={"5"} fontSize="5xl" fontWeight="bold" color="white">
                Book of Stamp
              </Text> */}
              <Menu     >
                <Button
                  onClick={onOpen}
                  variant={'outline'}
                  colorScheme='orange'
                  _hover={{ transform: "scale(1.05)" }}
                  h={'auto'}
                  p={4}
                  w={'90%'}
                  fontSize={'38px'}
                  ml={"5"}
                >
                  Submit Art
                </Button>
                <MenuButton ml={"5"} w={'90%'} as={Button} colorScheme="orange" variant="outline" >
                  Chapters
                </MenuButton>

                <MenuList bg="orange.200">
                  {chaptersList.map((chapter) => (
                    <MenuItem _hover={{ bg: 'black', color: 'orange.200' }} bg="orange.200" color={"black"} key={chapter.id} value={chapter.stamp}>
                      {chapter.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>

            </VStack>
          </HStack>

        </Center>


      </Box>
      <StampGrid stampIds={stamp_ids} />
      <Center
        mt={10}
        _hover={{ transform: "scale(1.05)" }}
      >

      </Center>
    </>
  );
}

export default HomePage;
