'use client'
import { Box, Button, Center, Image, useDisclosure } from '@chakra-ui/react';
import StampGrid from './components/StampGrid';
import SubmitFormModal from './components/submitFormModal';
import { stamp_ids } from './utils/stampIDs';

const HomePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box m={20} p={5}>
      <Center>
        <SubmitFormModal isOpen={isOpen} onClose={onClose} />

        <Image mb={40} boxSize="200px" src="walletIcon.webp" alt="Logo" className="navbar-logo" />
      </Center>

      <StampGrid stampIds={stamp_ids} />
      <Center
        m={10}

      >

        <Button
          m={10}
          onClick={onOpen}
          colorScheme='green'
          _hover={{ bg: "green", transform: "scale(1.05)" }}
          mr={4}
          fontSize={'72px'}
        >
          Submit Art
        </Button>
      </Center>
    </Box>
  );
}

export default HomePage;
