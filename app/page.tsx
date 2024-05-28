
'use client'
import { Box, Button, Center, Image, useDisclosure } from '@chakra-ui/react';
import Cursor from "./components/Cursor/Cursor";
import StampGrid from './components/StampGrid';
import SubmitFormModal from './components/submitFormModal';
import { stamp_ids } from './utils/stampIDs';
const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box m={20} p={5}>
       <Cursor/>

      <Center>
        <SubmitFormModal isOpen={isOpen} onClose={onClose} />
        <Image mb={10} boxSize="200px" src="walletIcon.webp" alt="Logo" className="navbar-logo" />
      </Center>

      <StampGrid stampIds={stamp_ids} />
      <Center
        m={5}
      >
        <Button
          onClick={onOpen}
          variant={'outline'}
          colorScheme='yellow'
          _hover={{ transform: "scale(1.05)" }}
          w={'50%'}
          h={'auto'}
          fontSize={'48px'}
        >
          Submit Art
        </Button>
      </Center>
    </Box>
  );
}

export default HomePage;
