import {
  Container,
  Flex,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  Tooltip,
  useDisclosure,
  Divider,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
} from "@chakra-ui/react";
import Mountain from "./Mountain";
import XPBar from "./XPBar";
import { useEffect, useState } from "react";
import { firestoreDB, getXPFromDatabase, setXPFromDatabase } from "../config/config";
import { readEmail, readUID } from "../functions";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { useColorModeValue } from "@chakra-ui/react";
import { maxXP } from "../constNumbers";
import { InfoIcon } from "@chakra-ui/icons";

function MountainPage() {
  // ~~~~~~~~~~~~~~~~~~~ hooks ~~~~~~~~~~~~~~~~~~~~~
  const [XP, setXP] = useState(0);
  const [modalTitle, setModalTitle] = useState('')
  const [modalDescription, setModalDescription] = useState('')
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~ modal hook ~~~~~~~~~~~~~~~~~~~
  const { isOpen, onOpen, onClose } = useDisclosure()
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // Set the XP bar state
  async function getXP() {
    const totalXP: number = await getXPFromDatabase(readUID() as string);

    setXP(totalXP);
  }

  // Load the XP state
  useEffect(() => {
    getXP();
  }, []);


  // Reset both XP and Tasks
  const handleReset = async () => {
    await setXPFromDatabase(readUID() as string, 0);
    sessionStorage.setItem("XPAmount", "0" || '')

    await removeTasks();
  };


  // Remove all tasks from the database
  const removeTasks = async () => {
    const batch = writeBatch(firestoreDB)
    const tasksCollection = collection(firestoreDB, "tasks")
    const usernameToFilter = readEmail()
    const querySnapshot = await getDocs(
      query(tasksCollection, where("username", "==", usernameToFilter))
    )
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    });

    await batch.commit();

    document.location.reload()
  }

  // Checks if user is max level
  const maxLevelCheck = (xp: number) => {
    if (xp >= maxXP) return false;

    return true
  }

  // Checks if user is max level with opposite return
  const tooltipCheck = (xp: number) => {
    if (xp >= maxXP) return true;

    return false
  }

  const resetTasks = () => {
    setModalTitle('Reset Tasks?')
    setModalDescription('All tasks will be permanently reset.')
    onOpen()
  }

  const resetLevel = () => {
    setModalTitle('Reset Level?')
    setModalDescription('Any XP earned will be lost.')
    onOpen()
  }

  const resetAll = () => {
    setModalTitle('Reset All?')
    setModalDescription('All tasks will be permanently reset and any XP earned will be lost.')
    onOpen()
  }

  
  // Change the message on the modal, handle task and then close the modal
  const modalButton = async () => {
    if (modalTitle === 'Reset Tasks?') {
      console.log("Reset Tasks")

      removeTasks()

      onClose()
    } 
    else if (modalTitle === 'Reset Level?') {
      console.log("Reset Level")

      await setXPFromDatabase(readUID() as string, 0);
      sessionStorage.setItem("XPAmount", "0" || '')

      onClose()

      document.location.reload()
    }
    else if (modalTitle === 'Reset All?') {
      console.log("Reset All")

      handleReset()

      onClose()
    }
  }

  return (
    <Box
      bg={{ base: useColorModeValue("rgba(255,255,255,0.5)", "rgba(0,0,0,0.7)"), lg: useColorModeValue("rgba(0,0,0,0)", "rgba(0,0,0,0)") }}
    >
      <Flex
        flexDir="column"
        mt={{ base: "", lg: "5%" }}
        color={useColorModeValue("bgDark.900", "white")}
        h={'100vh'}
      >
        <Container
          bg={{ base: '', lg: useColorModeValue("rgba(255,255,255,0.6)", "rgba(0,0,0,0.8)") }}
          rounded={{ base: "", lg: "3xl" }}
          pb={16}
          maxW={{ base: "100%", lg: "70%" }}
        >
          <Flex justifyContent={"center"} mt={'5%'}>
            <VStack maxW={{ base: '90%', md: 'lg' }} spacing={4} mt={{base: '2%'}}>

              {/* Information bubble */}
              <Popover isLazy>
                <PopoverTrigger>
                  <IconButton
                    aria-label={""}
                    size='lg'
                    icon={<InfoIcon />}
                    maxWidth={'40px'}
                    color={useColorModeValue("blue.400", "blue.200")}
                    fontSize={'20px'}
                    variant={'link'}
                    isRound
                    _hover={{
                      color: useColorModeValue("blue.500", "blue.300")
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent bg={useColorModeValue("bgLight.100", "bgDark.900")} color={useColorModeValue("bgDark.900", "bgLight.100")}>
                  <PopoverArrow bg={useColorModeValue("bgLight.100", "bgDark.900")} />
                  <PopoverBody textAlign={'center'}>Climb the mountain as you earn XP!</PopoverBody>
                </PopoverContent>
              </Popover>

              {/* XP bar component */}
              <XPBar xp={XP} />

              {/* Mountain component */}
              <Container>
                <Mountain />
              </Container>

              <Divider borderWidth={"1px"} my={4} borderColor={useColorModeValue("black", "")} />

              {/* Three buttons for reset tasks, level, all */}
              <Button bg={'gray.500'} _hover={{bg: 'gray.600'}} color={'white'} w={'25%'} minW={'150px'} onClick={resetTasks}>Reset Tasks</Button>
              <Tooltip label="Reach Max Level" placement="bottom" bg={useColorModeValue('rgba(20,18,20,0.8)', 'rgba(237,242,247,0.8)')} color={useColorModeValue('white', 'black')} isDisabled={tooltipCheck(XP)}>
                <Button isDisabled={maxLevelCheck(XP)} bg={'gray.500'} _hover={{bg: 'gray.600'}} color={'white'} w={'25%'} minW={'150px'} onClick={resetLevel}>Reset Level</Button>
              </Tooltip>
              <Button bg={'red.500'} _hover={{bg: 'red.600'}} color={'white'} w={'25%'} minW={'150px'} onClick={resetAll}>Reset all</Button>

            </VStack>

            {/* Modal content */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />
              <ModalContent bg={useColorModeValue('bgLight.100', 'bgDark.900')}>
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{modalDescription}</ModalBody>
                <ModalFooter>
                  <Button colorScheme="red" mr={3} onClick={modalButton}>
                    Reset
                  </Button>
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

          </Flex>
        </Container>
      </Flex>

      {/* Box to space out the page a bit more without affecting anything else */}
      <Box h={'40vh'}></Box>
    </Box>

  );
}

export default MountainPage;