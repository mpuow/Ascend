//import React from 'react'
import { Box, Container, VStack, useColorModeValue } from '@chakra-ui/react'
import { getFirstName, readDisplayName, readEmail, readImageURL } from '../functions'
import styled from 'styled-components'

// Image styled with styled components
const Img = styled.img`
border-radius: 50%; 
width: auto;
height: auto;
`

// Simple display of account information
const AccountDisplay = () => {

    return (
        <Box h={{base: '80vh', md: '90vh'}}>
            <Container maxW={{base: '100vw', md: '40vw'}} p={10} bg={useColorModeValue('bgLight.100', 'bgDark.900')} textAlign={'center'} flexDir={'column'} rounded={{base: '', md: '3xl'}} mt={{base: '30%', md: '15%'}}>
                <div className='text-center'>
                    <Box fontWeight="700" fontSize="30">Hello {getFirstName()}</Box>
                </div>
                <VStack mt={12} spacing={8}>
                    <p>Account info:</p>
                    <p>Name: {readDisplayName()}</p>
                    <p>Email: {readEmail()}</p>
                    <Img src={readImageURL()} />
                </VStack>
            </Container>
        </Box>
    )
}

export default AccountDisplay