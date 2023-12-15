import { CheckIcon, DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  CloseButton,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
  Tooltip,
} from "@chakra-ui/react"

import { useEffect, useRef, useState } from "react"
import { firestoreDB, getXPFromDatabase, updateXPAmount } from "../config/config"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import { readDisplayName, readEmail, readImageURL, readUID } from "../functions"
import XPBar from "./XPBar";
import { descriptionLengthMax, easyXP, hardXP, inputLengthMax, mediumXP } from "../constNumbers";

const TaskList = () => {
  // ~~~~~~~~~~~~~~~~~~~ hooks ~~~~~~~~~~~~~~~~~~~~~
  const [loading, setLoading] = useState(false)
  const [taskListItems, setTaskListItems] = useState<any>([])
  const [input, setInput] = useState("")
  const [description, setDescription] = useState("")
  const [editInput, setEditInput] = useState("")
  const [editID, setEditID] = useState("")
  const [radioDifficulty, setRadioDifficulty] = useState("")
  const [displayAlert, setDisplayAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [XP, setXP] = useState(0)
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // ~~~~~~~~~~~~~~~~ modal hook ~~~~~~~~~~~~~~~~~~~
  const { isOpen, onOpen, onClose } = useDisclosure()
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


  // Add a task to local storage and firebase - handle when to show errors and what messages to show
  const addTask = async (event: any) => {
    event.preventDefault()

    if (radioDifficulty === "") {
      setAlertText("You must choose a difficulty.")
      setDisplayAlert(true)
      return
    } else {
      setDisplayAlert(false)
    }

    setLoading(true)

    const setID = Math.floor(Math.random() * (1000000 - 10)) + 10

    if (
      input.length > 0 &&
      input.length < inputLengthMax &&
      description.length < descriptionLengthMax
    ) {
      try {
        const date = new Date().toLocaleString('en-GB')

        // Access the 'tasks' collection in Firestore
        const tasksCollection = collection(firestoreDB, "tasks")

        // Add the task to Firestore
        const docRef = await addDoc(tasksCollection, {
          input,
          difficulty: radioDifficulty,
          id: setID,
          description,
          status: "pending",
          username: readEmail(),
          startDate: date,
          endDate: "",
        })
        setDisplayAlert(false)

        // Log the Firestore document reference
        console.log("Document written with ID: ", docRef.id)

        // Add the task to the local state or update it as needed
        setTaskListItems((prevState: any) => [
          ...prevState,
          {
            input,
            difficulty: radioDifficulty,
            id: setID,
            description,
            status: "pending",
            startDate: date,
            endDate: "",
          },
        ])
      } catch (error) {
        console.error("Error adding task to Firestore: ", error)
      }
    }

    // Other validation checks and alerts here
    if (input.length > inputLengthMax) {
      setAlertText('Too many title characters! Please input fewer characters.')
      setDisplayAlert(true)
    }

    if (input.length === 0) {
      setAlertText('Not enough title characters! Please input at least one character.')
      setDisplayAlert(true)
    }

    if (description.length > descriptionLengthMax) {
      setAlertText('Too many description characters! Please input fewer characters.')
      setDisplayAlert(true)
    }

    setInput("")
    setDescription("")
    setRadioDifficulty("")
    setLoading(false)
  }

  // Update the amount of XP in session storage and firebase
  const setXpBar = (difficulty: string) => {
    let totalXP: any = sessionStorage.getItem("XPAmount")
    let addedXP = 0

    if (difficulty === "red.500") {
      setXP(XP + hardXP)
      addedXP = hardXP
    } else if (difficulty === "orange.500") {
      setXP(XP + mediumXP)
      addedXP = mediumXP
    } else {
      setXP(XP + easyXP)
      addedXP = easyXP
    }

    sessionStorage.setItem("XPAmount", (parseInt(totalXP) + addedXP).toString())
    updateXPAmount(readUID() as string, readDisplayName() as string, readEmail() as string, readImageURL() as string)
  }

  // Complete the task in local storage and firebase, update XP
  const completeTask = async (
    input: any,
    difficulty: any,
    id: any,
  ) => {
    try {
      const endDate = new Date().toLocaleString('en-GB')
      // Update the task status to "complete" in Firestore
      const tasksCollection = collection(firestoreDB, "tasks")
      const taskQuery = query(
        tasksCollection,
        // Unique identifiers
        where("input", "==", input),
        where("difficulty", "==", difficulty),
        where("id", "==", id)
      );
      const taskSnapshot = await getDocs(taskQuery)

      if (!taskSnapshot.empty) {
        const taskDoc = taskSnapshot.docs[0] // Assuming there's only one matching task
        const taskRef = doc(firestoreDB, "tasks", taskDoc.id)

        // Update the task status to "complete"
        await updateDoc(taskRef, { status: "complete", endDate: endDate })
      } else {
        console.log("Task not found in Firestore")
      }

      setTaskListItems((prevState: any) => {
        // Map over the current state and update the entry with matching 'id'
        return prevState.map((task: any) => {
          if (task.id === id) {
            return {
              ...task,
              status: "complete",
              endDate: endDate,
            }
          }
          return task
        })
      })

      setXpBar(difficulty)
      console.log('completed task')
    } catch (error) {
      console.error("Error updating task status in Firestore:", error)
    }
  }

  // Delete the task in local storage and firebase
  const deleteTask = async (
    input: any,
    index: any,
    difficulty: any,
    id: any,
  ) => {
    try {
      // Delete the task in Firestore
      const tasksCollection = collection(firestoreDB, "tasks")
      const taskQuery = query(
        tasksCollection,
        // Unique identifiers
        where("input", "==", input),
        where("difficulty", "==", difficulty),
        where("id", "==", id)
      )
      const taskSnapshot = await getDocs(taskQuery)

      if (!taskSnapshot.empty) {
        const taskDoc = taskSnapshot.docs[0]; // Assuming there's only one matching task
        const taskRef = doc(firestoreDB, "tasks", taskDoc.id)

        const arrCopy = [...taskListItems]
        arrCopy.splice(index, 1)
        setTaskListItems(arrCopy)


        // Delete the task from firestore
        await deleteDoc(taskRef)
        document.location.reload()
        console.log("Document deleted with ID: ", id)
      } else {
        console.log("Task not found in Firestore")
      }


    } catch (error) {
      console.error("Error deleting task in Firestore:", error)
    }
  }

  useEffect(() => {
    // Access the 'tasks' collection in Firestore
    const tasksCollection = collection(firestoreDB, "tasks")

    // Define the username to filter tasks
    const usernameToFilter = readEmail()

    // Fetch all tasks from Firestore
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(
          query(tasksCollection, where("username", "==", usernameToFilter), orderBy("endDate", "asc"), orderBy("startDate", "asc"))
        )
        const taskData: {
          [x: string]: string
          id: string
        }[] = [];
        querySnapshot.forEach((doc) => {
          taskData.push({ id: doc.id, ...doc.data() })
        });
        setTaskListItems(taskData)

        let totalXP: number = await getXPFromDatabase(readUID() as string)

        // Set the XP bar state
        setXP(totalXP)

      } catch (error) {
        console.error("Error fetching tasks from Firestore:", error)
      }
    }

    fetchData() // Fetch tasks when the component mounts

    return () => {
      
    }
  }, [XP]) // This effect runs once on mount, and again when XP is updated


  // Edit task in local storage and firebase
  const editTask = async (
    id: any,
    event: any,
  ) => {
    try {
      event.preventDefault()
      // Update the task input in Firestore
      if (editInput.length > 0 && editInput.length < inputLengthMax) {
        const tasksCollection = collection(firestoreDB, "tasks")
        const taskQuery = query(
          tasksCollection,
          // Unique identifier
          where("id", "==", id)
        );
        const taskSnapshot = await getDocs(taskQuery)

        if (!taskSnapshot.empty) {
          const taskDoc = taskSnapshot.docs[0] // Assuming there's only one matching task
          const taskRef = doc(firestoreDB, "tasks", taskDoc.id)

          // Update the task name in firebase
          await updateDoc(taskRef, { input: editInput })
        } else {
          console.log("Task not found in Firestore")
        }

        setTaskListItems((prevState: any) => {
          // Map over the current state and update the entry with matching 'id'
          return prevState.map((task: any) => {
            if (task.id === id) {
              return {
                ...task,
                input: editInput,
              }
            }
            return task
          })
        })

        console.log("Document edited with ID: ", id)
        setDisplayAlert(false)
      }

      if (editInput.length > inputLengthMax) {
        setAlertText('Too many title characters! Please input fewer characters.')
        setDisplayAlert(true);
      }

      setEditInput("")
      setEditID("")
      onClose()
    } catch (error) {
      console.error("Error updating task status in Firestore:", error)
    }
  };

  // Cancel edit for the edit modal, resets the editInput variable
  const cancelEdit = () => {
    setEditInput("")
    onClose()
  }

  // Returns an alert with alert specific message
  function triggerDisplayAlert(text: string) {
    return displayAlert ? (
      <Alert status="error" mt={4} color={useColorModeValue("red", "red.200")}>
        <AlertIcon />
        <Box>
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription w={"100%"}>
            {text}
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="absolute"
          right={1}
          top={1}
          onClick={() => setDisplayAlert(false)}
        />
      </Alert>
    ) : (
      <div></div>
    )
  }

  // Edit modal that appears when editing
  const EditModal = () => {
    const initialRef = useRef(null)

    return (
      <>
        {/* <IconButton bg={'yellow.500'} icon={<EditIcon />} aria-label={""} onClick={onOpen} /> */}

        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={() => cancelEdit()}
          isCentered
          preserveScrollBarGap
          motionPreset="none"
        >
          <ModalOverlay />
          <ModalContent
            mx={8}
            bg={useColorModeValue("bgLight.100", "bgDark.900")}
          >
            {/* <ModalCloseButton /> */}
            <ModalBody py={4}>
              <FormControl>
                <FormLabel textAlign={"center"}>Update Task</FormLabel>
                <form onSubmit={(event) => editTask(editID, event)}>
                  <Input
                    ref={initialRef}
                    placeholder="Edit Title"
                    value={editInput}
                    onChange={(event) => setEditInput(event.target.value)}
                  />
                </form>
              </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={"center"}>
              <Button
                colorScheme="blue"
                w={20}
                mr={4}
                onClick={(event) => editTask(editID, event)}
              >
                Save
              </Button>
              <Button w={20} onClick={() => cancelEdit()}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  // Little cirlce that shows the difficulty of the task
  const DifficultyCircle = (props: any) => (
    <Icon viewBox="0 0 200 200" {...props}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  )

  // Work around for the modal to pop up when clicking the edit button
  const addAndEdit = (id: any) => {
    if (editID === "") {
      setEditID(id)
    }
    onOpen()
  }

  // Display the pending and completed tasks if they exist
  const taskList = () =>
    taskListItems.length > 0 ? (
      <Tabs mt="2%" w="100%" align="center" isFitted>
        <TabList>
          <Tab
            _hover={{
              borderColor: "blue.500"
            }}>
            Active
          </Tab>
          <Tab
            _hover={{
              borderColor: "blue.500"
            }}>
            Complete
          </Tab>
        </TabList>
        <TabPanels
          overflowY={"scroll"}
          overscrollBehavior={"outside"}
          maxH={{ base: "60vh", lg: "80vh" }}
        >
          <TabPanel>
            {taskListItems
              .filter((task: any) => task.status === "pending")
              .map((task: any, index: number) => (
                <VStack key={index} mt={2}>
                  <Flex flexDir={"row"} mb={2} w="100%">
                    <Container w={"100%"} textAlign={"left"} maxW={"100%"}>
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container
                          w={"100%"}
                          textAlign={"left"}
                          maxW={"100%"}
                          wordBreak={"break-all"}
                        >
                          {task.input}
                        </Container>
                      </HStack>

                      <Container
                        w={"100%"}
                        textAlign={"left"}
                        maxW={"100%"}
                        wordBreak={"break-all"}
                        mt={2}
                      >
                        {task.description}
                      </Container>

                      <HStack
                        w={"100%"}
                        my={2}
                        mt={4}
                        justifyContent={"center"}
                        spacing={{ base: "10px", lg: "10px" }}
                        h={8}
                      >
                        <Tooltip label="Complete" placement="bottom" bg={useColorModeValue('rgba(20,18,20,0.8)', 'rgba(237,242,247,0.8)')} color={useColorModeValue('white', 'black')}>
                          <IconButton
                            aria-label={""}
                            bg={"green.600"}
                            icon={<CheckIcon />}
                            _hover={{
                              bg: "green.500"
                            }}
                            onClick={() =>
                              completeTask(
                                task.input,
                                task.difficulty,
                                task.id,
                              )
                            }
                          ></IconButton>
                        </Tooltip>

                        <Divider orientation="vertical" borderColor={useColorModeValue("black", "")} />

                        <Tooltip label="Edit" placement="bottom" bg={useColorModeValue('rgba(20,18,20,0.8)', 'rgba(237,242,247,0.8)')} color={useColorModeValue('white', 'black')}>
                            <IconButton
                              bg={"yellow.500"}
                              _hover={{
                                bg: "yellow.400"
                              }}
                              icon={<EditIcon />}
                              aria-label={""}
                              onClick={() => addAndEdit(task.id)}
                            />
                          </Tooltip>
                          <EditModal />


                        <Divider orientation="vertical" borderColor={useColorModeValue("black", "")} />

                        <Tooltip label="Delete" placement="bottom" bg={useColorModeValue('rgba(20,18,20,0.8)', 'rgba(237,242,247,0.8)')} color={useColorModeValue('white', 'black')}>
                          <IconButton
                            aria-label={""}
                            bg={"red.600"}
                            _hover={{
                              bg: "red.500"
                            }}
                            icon={<DeleteIcon />}
                            onClick={() => 
                              deleteTask(
                                task.input,
                                index,
                                task.difficulty,
                                task.id,
                              )
                            }
                          ></IconButton>
                        </Tooltip>
                      </HStack>

                      {task.startDate}
                    </Container>
                  </Flex>
                  <Divider borderColor={useColorModeValue("black", "")} />
                </VStack>
              ))}
          </TabPanel>
          <TabPanel>
            {taskListItems
              .filter((task: any) => task.status === "complete")
              .map((task: any) => (
                <>
                  <VStack key={task.index} pb={2}>
                    <Flex w={"100%"} flexDir={"row"} my={2}>
                      <HStack>
                        <DifficultyCircle color={task.difficulty} />
                        <Container
                          w={"100%"}
                          textAlign={"left"}
                          maxW={"100%"}
                          wordBreak={"break-all"}
                        >
                          {task.input}
                        </Container>
                      </HStack>
                    </Flex>
                    <Container
                      w={"100%"}
                      textAlign={"left"}
                      maxW={"100%"}
                      wordBreak={"break-all"}
                    >
                      {task.description}
                    <VStack pt={4}>
                      <Box>Start: {task.startDate}</Box>
                      <Box>Complete: {task.endDate}</Box>
                    </VStack>
                    </Container>
                  </VStack>
                  <Divider borderColor={useColorModeValue("black", "")} />
                </>
              ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    ) : (
      <></>
    )

  // Return Task page
  return (
    <Box
      pb={{base: '70%', sm:'30%'}}
      bg={{ base: useColorModeValue("rgba(255,255,255,0.5)", "rgba(0,0,0,0.7)"), lg: useColorModeValue("rgba(0,0,0,0)", "rgba(0,0,0,0)")}}
      fontWeight={'500'}
      >
      <Flex
        w="100%"
        h="100vh"
        flexDir="column"
        mt={{ base: "", lg: "5%" }}
        mb={{ base: "", lg: "15%" }}
        color={useColorModeValue("bgDark.900", "white")}
      >
        <Container
          w="100%"
          bg={{ base: '', lg: useColorModeValue("rgba(255,255,255,0.6)", "rgba(0,0,0,0.8)")}}
          rounded={{ base: "", lg: "3xl" }}
          p={8}
          maxW={{ base: "100%", lg: "70%" }}
        >

          {/* XP bar component */}
          <XPBar xp={XP} />

          <Divider borderWidth={"1px"} mt={8} borderColor={useColorModeValue("black", "")} />

          <VStack justifyContent={'center'} spacing={-1}>
            <Text fontWeight="700" fontSize="30" textAlign="center" my={4}>
              Tasks
            </Text>

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
                  <PopoverBody textAlign={'center'}>
                    Create tasks with a chosen difficulty and an optional description.
                    <br />
                    <br />
                    Complete the task to earn XP, edit the title if it's wrong or delete the task if you change your mind.
                    </PopoverBody>
                </PopoverContent>
              </Popover>

          </VStack>
          
          {/* Form for the task inputs - enables the use of 'enter' to submit tasks */}
          <form onSubmit={addTask}>
            <FormControl>
              <Flex
                justifyContent={"center"}
                color={useColorModeValue("bgDark.900", "white")}
                mt={4}
              >
                <Flex>
                  <RadioGroup
                    onChange={setRadioDifficulty}
                    value={radioDifficulty}
                  >
                    <Stack spacing={{ base: 10, md: 20}} direction="row" my={2}>
                      <Radio colorScheme="green" value="green.500" borderColor={useColorModeValue("black", "gray")} _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}>
                        Easy
                      </Radio>
                      <Radio colorScheme="orange" value="orange.500" borderColor={useColorModeValue("black", "gray")} _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}>
                        Medium
                      </Radio>
                      <Radio colorScheme="red" value="red.500" borderColor={useColorModeValue("black", "gray")} _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}>
                        Hard
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Flex>
              </Flex>
              <Flex mt="2%">
                {/* variant='flushed' */}
                <Input
                  placeholder="Title"
                  w="100%"
                  value={input}
                  color={useColorModeValue("bgDark.900", "white")}
                  _placeholder={{ color: "inherit" }}
                  onChange={(event) => setInput(event.target.value)}
                  borderColor={useColorModeValue("black", "gray")}
                  borderWidth={'1px'}
                  _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}
                />
                <Button
                  sx={{ width: "90px" }}
                  ml="5"
                  colorScheme="blue"
                  onClick={addTask}
                  _hover={{
                    bg: "blue.500"
                  }}
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      size="20px"
                      color="blue.300"
                    />
                  ) : (
                    <p>Add Task</p>
                  )}
                </Button>
              </Flex>
              <Textarea
                mt={4}
                color={useColorModeValue("bgDark.900", "white")}
                borderColor={useColorModeValue("black", "gray")}
                _hover={{ borderColor: useColorModeValue("blue.400", "blue.400") }}
                borderWidth={'1px'}
                _placeholder={{ color: "inherit" }}
                placeholder="Description (optional)"
                resize={"none"}
                value={description}
                id="description"
                onChange={(event) => setDescription(event.target.value)}
              />
              {triggerDisplayAlert(alertText)}
            </FormControl>
          </form>
          {taskList()}
        </Container>
      </Flex>
    </Box>
  )
}

export default TaskList