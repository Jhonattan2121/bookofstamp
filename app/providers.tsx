'use client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
const chakraTheme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "black",
            },
        },
    },
})

export function Providers({ children }: { children: React.ReactNode }) {

    return (
        <ChakraProvider theme={chakraTheme}>
            {children}
        </ChakraProvider>
    )
}

export default Providers