import { Box, Container, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader"

// Used to redirect users if the page does not exist
const NoPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  // Redirect to default page after 3 seconds
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      navigate('/')
      setLoading(false)
    }, 3000)
  }, [])

  return (
    <Box rounded={'3xl'} minW={'30vw'} h={'100vh'} p={20}>
      <Container bg={useColorModeValue("rgba(255,255,255,0.8)", "rgba(0,0,0,0.8)")} color={useColorModeValue("bgDark.900", "bgLight.100")} rounded={'3xl'} p={8}>
        <p className='lg:text-4xl text-3xl'>NO PAGE FOUND :(</p>
        <p className="text-xl mt-20">Redirecting<p className="">{loading ? <ClipLoader color={useColorModeValue("bgDark.900", "bgLight.100")} size={20} /> : ""}</p></p>
      </Container>
    </Box>
  )
}

export default NoPage