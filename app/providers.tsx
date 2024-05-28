'use client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
const chakraTheme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "black",
                backgroundImage: "url('https://media.giphy.com/media/u7uwliwM86GBi/giphy.gif')",
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