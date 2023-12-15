import { Flex } from "@chakra-ui/react"

// Just to keep all content properly on screen after ChakraNavbarLogged was changed to a fixed position
const InvisNavbar = () => {
  return (
    <Flex h={12} alignItems={'center'} justifyContent={'space-between'}></Flex>
  )
}

export default InvisNavbar