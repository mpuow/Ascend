'use client'

import { Avatar, Box, Container, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import mountain from '../assets/mountain1.1.jpg'
import { getFirstName } from '../functions'

// Function for home page footer
function FooterComponent() {
    return (
        <Box
            bg={useColorModeValue('bgLight.100', 'bgDark.900')}
            color={useColorModeValue('gray.800', 'textDark.900')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={8}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={6}>
                    <Avatar
                        size={'sm'}
                        src={mountain}
                    />
                    <Box as="a" href={'/'}>
                        Home
                    </Box>
                    
                    <Box as="a" href={'#about'}>
                        About
                    </Box>
                </Stack>
                <Text color={useColorModeValue('gray.800', 'textDark.900')}>Ascend : A time management application</Text>
            </Container>
        </Box>
    )
}

// Function for logged in footer
function FooterComponentLogged() {
    return (
        <Box
            bg={useColorModeValue('bgLight.100', 'bgDark.900')}
            color={useColorModeValue('textLight.100', 'textDark.900')}
            >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={8}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Stack direction={'row'} spacing={{ base: 3, sm: 6 }}>
                    <Avatar
                        size={'sm'}
                        src={mountain}
                    />
                    <Box as="a" href={'/tasks'}>
                        Tasks
                    </Box>
                    <Box as="a" href={'/focus'}>
                        Focus
                    </Box>
                    <Box as="a" href={'/'}>
                        Progress
                    </Box>
                    <Box as="a" href={'/analytics'}>
                        Analytics
                    </Box>
                    <Box as="a" href={'/account'}>
                        Account
                    </Box>
                </Stack>
                <Text>Logged in as: {getFirstName()}</Text>
            </Container>
        </Box>
    )
}

// Renders a different footer based on loggedState
const Footer = (props:any) => (
    <>
        {!props.loggedState ?

            <FooterComponent />

            :

            <FooterComponentLogged />

        }
    </>
)

export default Footer