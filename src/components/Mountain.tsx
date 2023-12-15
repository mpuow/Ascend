import React, { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { styled } from "styled-components";
import mountain from "../assets/mountain1.1.jpg";
import character1 from "../assets/1.png";
import character2 from "../assets/2.png";
import { readXPAmount } from "../functions";
import { maxXP } from "../constNumbers";

// Style the mountain image using styled components
const Img = styled.img`
  border-radius: 10%;
  transition: transform 0.5s ease;
`;

// Display the mountain and character, with logic for climbing the mountain and updating it
function Mountain() {
  // ~~~~~~~~~~~~~~~~~~~ hooks ~~~~~~~~~~~~~~~~~~~~~
  const [personVerticalPosition, setPersonVerticalPosition] = useState(0)
  const [personHorizontalPosition, setPersonHorizontalPosition] = useState(0)
  const [characterUrl, setCharacterUrl] = useState("")
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // const mountainHeight = 1000
  
  // Get XP from session storage
  const xp = readXPAmount()

  // Update the page
  useEffect(() => {

    // If user is max level, move character to the top of the mountain (roughly)
    if (xp >= maxXP) {
      setCharacterUrl(character1)
      setPersonVerticalPosition(320) //320
      setPersonHorizontalPosition(-10);
      return
    }
    // Calculate the vertical position to move the person up
    setCharacterUrl((xp<100)?character1:character2)
    
    const verticalPosition = xp/4 //(xp / 10000) * mountainHeight
    setPersonVerticalPosition(verticalPosition)

    // Calculate the horizontal position using a sinusoidal movement
    const horizontalPosition = Math.sin((xp / 320) * Math.PI * 2) * -100;
    setPersonHorizontalPosition(horizontalPosition);
  }, [xp])

  const personStyle: React.CSSProperties = {
    position: "absolute",
    transition: "left 0.5s ease", // Add transition for smooth movement
    left: `calc(50% + ${personHorizontalPosition}px)`,
    bottom: `${personVerticalPosition}px`,
    width: "12%",
    animation: "moveUp 4s linear infinite",
  }

  const mountainContainer: React.CSSProperties = {
    position: "relative",
    width: "80vw",
    // height: "45vh"
  }

  const mountainStyle: React.CSSProperties = {
    width: "100%",
  }

  return (
    <Flex justifyContent={"center"} padding={"30px"}>
      <div style={ mountainContainer }>
        <Img src={mountain} alt="Mountain" style={mountainStyle} />
        <Img src={characterUrl} alt="Person" style={personStyle} />
      </div>
    </Flex>
  )
}

export default Mountain