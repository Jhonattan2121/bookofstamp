import { ColorModeScript } from '@chakra-ui/react';
import theme from '../theme';

const ColorModeScriptWrapper: React.FC = () => {
    return <ColorModeScript initialColorMode={theme.config.initialColorMode} />;
};

export default ColorModeScriptWrapper;
