// import React from 'react'
import { signInWithGoogle } from './Hero';

'use client'

import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  useColorModeValue,
  Image,
  VStack,
  Divider,
  Button,
  useColorMode,
} from '@chakra-ui/react'

import mountain from "../assets/mountain1.1.jpg";
import { BsGoogle } from 'react-icons/Bs';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

// Set css style for mountain
const mountainStyle: React.CSSProperties = {
  width: "50%",
  borderRadius: "50%",
}

// Returns a large logo with name under, with a sign in to Google button and a dark mode toggle
const Hero1st = (props:any) => {

  // Hook to change colour mode of the whole app
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
      <>
          <Container maxW={{base: '100%', lg: "70vw"}} mb={{base: '30%', md: "20%"}}>
              <Stack
                  as={Box}
                  textAlign={'center'}
                  color={useColorModeValue('textLight.100', 'textDark.900')}
                  bg={useColorModeValue("bgLight.100", "bgDark.900")}
                  rounded={'3xl'}
                  shadow={'mainShadow'}
                  spacing={{ base: 8, md: 14 }}
                  py={{ base: 10, md: 26 }}
                  >

                  <VStack alignSelf={'center'} mt={'2%'}>
                    <Image src={mountain} alt="Mountain" style={mountainStyle} />
                    <Heading
                      fontWeight={700}
                      fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                      lineHeight={'110%'}
                    >
                      Ascend
                    </Heading>
                    <Divider borderWidth={"1px"} mt={8} borderColor={useColorModeValue("black", "")} />
                  </VStack>

                  <Heading
                      fontWeight={700}
                      fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                      lineHeight={'110%'}
                  >
                      Gamified to-do list
                  </Heading>
                  <Text
                    fontWeight={700}
                    fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    mt={{ base: -5, md: -10 }}
                  >
                    with powerful features.
                  </Text>
                  <Text
                  fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                  >
                    Start your journey of self discipline and productivity with Ascend.
                  </Text>
                  <Container w={{base:'150px', sm:'200px'}}>
                    <VStack spacing={15} pb={6}>
                      <Button
                            minW={200}
                            rounded={'full'}
                            leftIcon={<BsGoogle />}
                            color={'bgDark.900'}
                            bg={'green.400'}
                            _hover={{ 
                              bg: 'green.500',
                            }}
                            onClick={() => signInWithGoogle(props)}>
                            Sign in with Google
                        </Button>
                        <Button
                          minW={200}
                          rounded={'full'}
                          onClick={toggleColorMode}
                          bg={useColorModeValue('gray.400','gray.300')}
                          color={'bgDark.900'}
                          _hover={{
                            bg: 'gray.500',
                          }}
                        >
                          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </VStack>
                  </Container>
              </Stack>
          </Container>
      </>
  )
}

export default Hero1st