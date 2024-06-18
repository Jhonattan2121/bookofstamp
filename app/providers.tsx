'use client';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default Providers;
