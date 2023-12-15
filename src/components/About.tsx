'use client'

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Flex,
  useColorModeValue,
  Text,
  Container,
  forwardRef,
  Box,
  Button,
  Link,
} from '@chakra-ui/react'

import { ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { signInWithGoogle } from './Hero'


// Render an accordian with information about the app - ref is sent as a prop to be accessed from other files
const About = forwardRef((props, ref: any,) => {
  return (
    <Flex justifyContent={'center'} ref={ref} id="about" bg={useColorModeValue('ghostwhite', '#292929')} pt={8} pb={14} color={useColorModeValue('bgDark.900', 'bgLight.100')}>
      <Box ref={ref} w={'80vw'}>
        <Flex
          minH={'50vh'}
          minW={'100%'}
          justify={'center'}
        >
          <Container minW={{ base: '100vw', md: '50vw' }} textAlign={'center'}>
            <Text
              py={10}
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
              color={useColorModeValue('textLight.100', 'textDark.900')}
              lineHeight={'110%'}>
              FAQ{' '}
            </Text>
            <Accordion allowMultiple width="100%" maxW="100vw" rounded="lg">
              <AccordionItem>
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}>
                  <Text fontSize="md">How do I use Ascend?</Text>
                  <ChevronDownIcon fontSize="24px" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text textAlign={'left'}>
                    Ascend provides a simple and intuitive UI that allows users to create and view tasks on the 'Task' page, prioritise tasks with our 'Focus' page or track progression on our 'Progress' page.
                    <br />
                    <br />
                    Ascend uses Google accounts for authorisation, therefore no need to make a new account.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}>
                  <Text fontSize="md">Is Ascend available on multiple platforms?</Text>
                  <ChevronDownIcon fontSize="24px" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text textAlign={'left'}>
                    Ascend is available on modern web browsers and is availale for download on PC and mobile devices.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}>
                  <Text fontSize="md">Can I sync my tasks across devices?</Text>
                  <ChevronDownIcon fontSize="24px" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                <Text textAlign={'left'}>
                    Yes! Ascend utilises a robust backend which allows users to access their data accross multiple devices.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}>
                  <Text fontSize="md">Is my data secure?</Text>
                  <ChevronDownIcon fontSize="24px" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text textAlign={'left'}>
                    Ascend uses Firebase as our backend solution. Firebase is a cloud computing service hosted by Google, which has been developed in accordance with the EU General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA).
                    <br />
                    <br />
                    Learn more: &#9;
                    <Link href='https://firebase.google.com/support/privacy' color='blue.500' isExternal>
                      Privacy and Security in Firebase <ExternalLinkIcon mb={1}/>
                    </Link>
                  </Text>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  p={4}>
                  <Text fontSize="md">How do I get started?</Text>
                  <ChevronDownIcon fontSize="24px" />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text textAlign={'left'}>
                    Click the button below to sign in to Google.
                  </Text>
                  <Flex py={4}>
                    <Button
                            rounded={'full'}
                            px={6}
                            bg={'blue.400'}
                            _hover={{ bg: 'blue.500' }}
                            onClick={() => signInWithGoogle(props)}>
                            Get started
                        </Button>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Container>
        </Flex>
      </Box>
    </Flex>
  )
})

export default About