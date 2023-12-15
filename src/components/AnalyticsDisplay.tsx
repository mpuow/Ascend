import React, { useEffect, useState } from "react";
import { Box, Container, Flex, Text } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/config";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import { readEmail } from "../functions";
import { useColorModeValue } from "@chakra-ui/react";
import { easyXP, hardXP, mediumXP } from "../constNumbers";

Chart.register(...registerables);

interface Task {
  username: string;
  id: string;
  input: string;
  difficulty: string;
  description: string;
  status: string;
}

// Display graph of current and completed tasks
const AnalyticsDisplay: React.FC = () => {
  const [taskData, setTaskData] = useState<{
    barData: {
      labels: string[];
      datasets: {
        label: string;
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
        hoverBackgroundColor: string;
        hoverBorderColor: string;
        data: number[];
      }[];
    };
  }>({
    barData: {
      labels: [],
      datasets: [
        {
          label: "Completed Tasks",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
          hoverBorderColor: "rgba(75, 192, 192, 1)",
          data: [],
        },
        {
          label: "Pending Tasks",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
          hoverBorderColor: "rgba(255, 99, 132, 1)",
          data: [],
        },
      ],
    },
  });

  useEffect(() => {
    // Access the 'tasks' collection in Firestore
    const tasksCollection = collection(firestoreDB, "tasks");

    const getDifficulty = (task: { difficulty: any }) => {
      switch (task.difficulty) {
        case "red.500":
          return hardXP;
        case "orange.500":
          return mediumXP;
        case "green.500":
          return easyXP;
        default:
          return 0;
      }
    };

    // Fetch all tasks from Firestore and sort by difficulty
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(tasksCollection);
        const tasks: Task[] = [];

        querySnapshot.forEach((doc) => {
          tasks.push(doc.data() as Task);
        });

        const barData = {
          labels: [] as string[],
          datasets: [
            {
              label: "Completed Tasks",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
              hoverBorderColor: "rgba(75, 192, 192, 1)",
              data: [] as number[],
            },
            {
              label: "Pending Tasks",
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
              hoverBorderColor: "rgba(255, 99, 132, 1)",
              data: [] as number[],
            },
          ],
        };

        tasks.forEach((task) => {

          if (task.username === readEmail()) {
            const difficulty = getDifficulty(task);

            barData.labels.push(task.input); // Assuming 'input' is the label for tasks
            if (task.status === "complete") {
              barData.datasets[0].data.push(difficulty); // Completed task
              barData.datasets[1].data.push(0); // Pending task
            } else {
              barData.datasets[0].data.push(0); // Completed task
              barData.datasets[1].data.push(difficulty); // Pending task
            }
          }
        });

        setTaskData({
          barData,
        });
      } catch (error) {
        console.error("Error fetching tasks from Firestore:", error);
      }
    };

    fetchData(); // Fetch tasks when the component mounts
  }, []); // The empty dependency array ensures this effect runs once on mount

  return (

    <Box
    bg={{ base: useColorModeValue("rgba(255,255,255,0.5)", "rgba(0,0,0,0.7)"), lg: useColorModeValue("rgba(0,0,0,0)", "rgba(0,0,0,0)") }}
    >
    <Flex
      flexDir="column"
      mt={{ base: "2%", lg: "5%" }}
      color={useColorModeValue("bgDark.900", "white")}
    >
      <Container
        w="100%"
        bg={{ base: '', lg: useColorModeValue("rgba(255,255,255,0.6)", "rgba(0,0,0,0.8)") }}
        rounded={{ base: "", lg: "3xl" }}
        maxW={{ base: "100%", lg: "90%" }}
      >
            <Box pb={'3%'}>
              <Text fontWeight="700" fontSize="30" textAlign="center" my={4}>
                Analytics
              </Text>
              <div className="m-10 rounded-3xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
                <Bar
                  data={taskData.barData}
                  options={{
                    indexAxis: "y",
                    scales: {
                      x: {
                        beginAtZero: true,
                      },
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              </div>

            </Box>
      </Container>
    </Flex>
    <Box h={{base: '80vh', md:'60vh', lg:'50vh'}}></Box>
    </Box>
  );
};

export default AnalyticsDisplay;