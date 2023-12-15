import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Typed from 'react-typed'

// Used to redirect users back to the home page if they are not logged in
const Unauthorised = () => {
  const navigate = useNavigate()

  // Navigate to default page after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }, [])

  return (
    <Box rounded={'3xl'} minW={'30vw'} h={'100vh'} p={20}>
      <Container bg={useColorModeValue("bgLight.100", "bgDark.900")} color={useColorModeValue("bgDark.900", "bgLight.100")} rounded={'3xl'} p={8}>
        <p className='lg:text-4xl text-3xl'>Unauthorised. Please log in. Redirecting</p>
        <Typed className='lg:text-4xl text-2xl font-bold justify-center text-center my-40' strings={['.', '..', '...']} typeSpeed={120} loop />
      </Container>
    </Box>
  )
}

export default Unauthorised