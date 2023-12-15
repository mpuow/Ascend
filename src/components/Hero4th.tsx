'use client'

import { Flex, VStack, useBreakpointValue } from '@chakra-ui/react'

// Displays an example image of the Tasks page, on the home screen
function taskShot() {
  return (
    <Flex
      w={'full'}
      h={{base:'40vh', md:'80vh'}}
      backgroundImage={{
        base:'url("src/assets/taskshotcropped.png")',
        md:'url("src/assets/taskshot.png")'
      }}
      backgroundSize={'cover'}
      backgroundPosition={'center center'}
      backgroundRepeat="no-repeat">
      <VStack
        w={'full'}
        justify={'center'}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={'linear(to-r, blackAlpha.600, transparent)'}>
      </VStack>
    </Flex>
  )
}

export default taskShot