
import { Box, Center, Image } from '@chakra-ui/react';
import StampGrid from './components/StampGrid';
import { stamp_ids } from './utils/stampIDs';

const HomePage = () => {
  return (
    <Box m={20} p={5}>
      <Center>

        <Image mb={40} boxSize="200px" src="walletIcon.webp" alt="Logo" className="navbar-logo" />
      </Center>

      <StampGrid stampIds={stamp_ids} />
    </Box>
  );
}

export default HomePage;
