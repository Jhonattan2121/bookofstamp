'use client'
import { Box, Button, Center, HStack, Image, Menu, MenuButton, MenuItem, MenuList, VStack, useDisclosure } from '@chakra-ui/react';
import { NextPage } from 'next';
import { useState } from 'react';
import StampGrid from './components/StampGrid';
import SubmitFormModal from './components/submitFormModal';
import { chapter1StampIds, chapter2StampIds, chapter3StampIds, chapter4StampIds } from './utils/stampIDs';

const HomePage: NextPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStampIds, setCurrentStampIds] = useState(chapter1StampIds.map(item => item.cpid));
  const [currentChapter, setCurrentChapter] = useState(1);
  const chaptersList = [
    {
      id: 1,
      title: "Chapter 1",
      description: "Chapter 1 Description",
      stampIds: chapter1StampIds.map(item => item.cpid),
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Chapter 2",
      description: "Chapter 2 Description",
      stampIds: chapter2StampIds.map(item => item.cpid),
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Chapter 3",
      description: "Chapter 3 Description",
      stampIds: chapter3StampIds.map(item => item.cpid),
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Chapter 4",
      description: "Chapter 4 Description",
      stampIds: chapter4StampIds.map(item => item.cpid),
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
                  colorScheme='yellow'
                  _hover={{ transform: "scale(1.05)" }}
                  h={'auto'}
                  p={4}
                  w={'90%'}
                  fontSize={'20px'}
                  ml={"5"}
                >
                  Submit Art
                </Button>
                <MenuButton ml={"5"} w={'90%'} as={Button} colorScheme="yellow" variant="outline">
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
    </>
  );
}

export default HomePage;
