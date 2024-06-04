'use client'
import { Box, Button, Center, HStack, Image, Menu, MenuButton, MenuItem, MenuList, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import StampGrid from './components/StampGrid';
import SubmitFormModal from './components/submitFormModal';
import { chapter1StampIds, chapter2StampIds, chapter3StampIds } from './utils/stampIDs';

const HomePage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStampIds, setCurrentStampIds] = useState<string[]>(chapter1StampIds);
  const [currentChapter, setCurrentChapter] = useState(1);
  const chaptersList = [
    {
      id: 1,
      title: "Chapter 1",
      description: "Chapter 1 Description",
      stampIds: chapter1StampIds,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Chapter 2",
      description: "Chapter 2 Description",
      stampIds: chapter2StampIds,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Chapter 3",
      description: "Chapter 3 Description",
      stampIds: chapter3StampIds,
      image: "https://via.placeholder.com/150",
    },
  ];

  const handleChapterClick = (stamps: string[]) => {
    setCurrentStampIds(stamps);
  };

  return (
    <>
      <Box m={1} p={5}>
        <Center>
          <SubmitFormModal isOpen={isOpen} onClose={onClose} />
          <HStack>
            <Image mb={-3} boxSize="100px" src="AZlogo.webp" alt="Logo" className="navbar-logo" />
            <VStack>
              <Menu>
                <Button
                  onClick={onOpen}
                  variant={'outline'}
                  colorScheme='orange'
                  _hover={{ transform: "scale(1.05)" }}
                  h={'auto'}
                  p={4}
                  w={'90%'}
                  fontSize={'20px'}
                  ml={"5"}
                >
                  Submit Art
                </Button>
                <MenuButton ml={"5"} w={'90%'} as={Button} colorScheme="orange" variant="outline">
                  Chapter {currentChapter}
                </MenuButton>
                <MenuList zIndex={2} bg="orange.200">
                  {chaptersList.map((chapter) => (
                    <MenuItem
                      onClick={() => {
                        handleChapterClick(chapter.stampIds);
                        setCurrentChapter(chapter.id);
                      }}
                      _hover={{ bg: 'black', color: 'orange.200' }}
                      bg="orange.200"
                      color={"black"}
                      key={chapter.id}
                    >
                      {chapter.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </VStack>
          </HStack>
        </Center>
      </Box>

      <StampGrid stampIds={currentStampIds} />

      <Box p={5}>
        <Center>
          <Text fontSize="2xl" color="orange.200">
            RULES
          </Text>
        </Center>
        <Box border={"2px dashed black"} color={'black'} m={'10%'} mt={3} bg="orange.200" p={5} borderRadius="md">
          <Text mb={2}>
            1. STAMP size doesnt matter, if you can STAMP it according to STAMP protocol rules it qualifies (minting via Stampchain.io assures your STAMP is valid).
          </Text>
          <Text mb={2}>
            2. The submitted STAMP must not be distributed over 50% of total issued supply (exceptions apply).
          </Text>
          <Text mb={2}>
            3. You must issue at least 21 STAMPS***
          </Text>
          <Text mb={2}>
            4. No NSFW (use good taste/judgement).
          </Text>
          <Text mb={2}>
            5. Your STAMP will be included not only in all official Book of STAMP online directory/galleries, but a printed book as well (Book of STAMP).
          </Text>
          <Text fontWeight="bold" mt={3}>
            NOTE: you may burn down to 1/1 from 21 if your art/submission does not find a purchaser [or one purchaser] within 48 hours of a dispenser being open.
          </Text>
        </Box>
      </Box>

      <Box p={5} textAlign="center">
        <Text fontSize="lg">
          Please consider donating to help fund the green banner and keeping the project alive:
        </Text>
        <Text fontSize="lg" color="orange.600">
          1STAMPKj9cYTcuCKBuo81HqmWcNeULM3E
        </Text>
        <Text fontSize="sm" mt={2}>
          ©2023 Book of Stamp
        </Text>
      </Box>
    </>
  );
}

export default HomePage;
