'use client'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
const chakraTheme = extendTheme({
    styles: {
        global: {
            body: {
                bg: "black",
                backgroundImage: "url('https://i.pinimg.com/originals/c8/0a/e6/c80ae609854f3686008e15491929e070.gif')",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backdropFilter: "blur(5px)"

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