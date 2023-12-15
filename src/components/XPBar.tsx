import { Alert, AlertIcon, Box, Flex, Progress, VStack, useColorModeValue } from "@chakra-ui/react"
import { maxXP } from "../constNumbers";

// Calculate color based on XP value
const calculateColor = (xp: number) => {
    const colors = [
        "gray",
        "beige",
        "azure",
        "lightgreen",
        "ForestGreen",
        "steelblue",
        "royalblue",
        "darkviolet",
        "fuchsia",
        "crimson",
    ]

    if (xp >= maxXP) return "gold";

    const index = Math.floor(xp / 100)

    return colors[index]
}

// Calculates level based on XP
const calculateLevel = ( xp: number) => {
    if (xp >= maxXP) return "Max Level";

    return ('Level ' + Math.floor(xp / 100))
}

// Returns a border size depending on if max level has been reached
const calculateMaxLevelBorder = ( xp: number) => {
    if (xp >= maxXP) return "4px";

    return '0px'
}

// Sets the XP bar to 100 if max level has been reached
const calculateMaxLevel = ( xp: number) => {
    if (xp >= maxXP) return 100;

    return xp % 100
}

// Returns a prompt once max level has been reached
const calculatePrompt = ( xp: number) => {
    if (xp >= maxXP) return (
        <Alert status='warning'>
            <AlertIcon />
            You have reached the maximum level. Navigate to 'Progress' to reset your level.
        </Alert>
    )

    return (<div></div>)
}

// XP bar
const XPBar = (XP: any) => {
    return (
        <Box bg={useColorModeValue('rgba(37,38,38,0.2)', '')} p={4} rounded={'2xl'} fontWeight={'500'}>
            <div className="text-white flex justify-center text-center">
                <Box
                    fontSize="4xl"
                    color={calculateColor(XP.xp)}
                    transition="color 0.2s"
                    border={calculateMaxLevelBorder(XP.xp)}
                    borderColor={calculateColor(XP.xp)}
                    p={2}
                    mb={6}
                    rounded={'3xl'}
                >
                    {calculateLevel(XP.xp)}
                </Box>
            </div>
            <VStack>
                <Flex w={"100%"} justifyContent={"center"} mt={2}>
                    <Progress
                        sx={{
                            // "& > div:first-child": {
                            "& > div:first-of-type": {
                                transitionProperty: "width",
                            },
                        }}
                        colorScheme="pink"
                        value={calculateMaxLevel(XP.xp)}
                        w={{ base: '80vw', lg: 700 }}
                        hasStripe
                        isAnimated
                        max={100}
                    />
                </Flex>
                <Box mt={'4%'}>
                    {calculatePrompt(XP.xp)}
                </Box>
            </VStack>
        </Box>
    )
}

export default XPBar