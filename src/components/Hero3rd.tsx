'use client'

import { ReactElement } from 'react'
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Center, useColorModeValue } from '@chakra-ui/react'
import { FiList, FiPlus, FiCheck } from 'react-icons/fi'

// Defining types
interface FeatureProps {
  title: string
  text: string
  icon: ReactElement
}

// Component for each feature on the home screen
const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Center>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={useColorModeValue("bgLight.100", "bgDark.900")}
          rounded={'full'}
          bg={useColorModeValue("blue.500", "bgLight.100")}
          mb={1}>
          {icon}
        </Flex>
      </Center>

      <Stack textAlign={'center'}>
        <Center>
          <Text fontWeight={600} color={useColorModeValue("blue.500", "bgLight.100")} fontSize={'xl'}>{title}</Text>
        </Center>
        <Center>
          <Text color={useColorModeValue("textLight.100", "textDark.900")}>{text}</Text>
        </Center>
      </Stack>

    </Stack>
  )
}

// Puts 3 features together in a column or row, depending on screen size
function SimpleThreeColumns() {
  return (
    <Box p={20} bg={useColorModeValue("bgLight.100", "bgDark.900")}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FiPlus} w={10} h={10} />}
          title={'Create and Assign'}
          text={
            'Create and assign difficulty to tasks.'
          }
        />
        <Feature
          icon={<Icon as={FiList} w={10} h={10} />}
          title={'View Task List'}
          text={
            'View tasks all in one place - organised for you.'
          }
        />
        <Feature
          icon={<Icon as={FiCheck} w={10} h={10} />}
          title={'Control your progress'}
          text={
            'Once you have completed a task, confirm it to gain XP.'
          }
        />
      </SimpleGrid>
    </Box>
  )
}

export default SimpleThreeColumns