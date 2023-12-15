import ChakraNavbarLogged from './ChakraNavbarLogged'

// Returns a different navbar based on loggedState
const Navbar = (props: any) => {
  return (
    <>
      {!props.loggedState ?

        // <ChakraNavbar setLoggedState={props.setLoggedState} />   -  old navbar for home page
        <div></div>
        :
        <ChakraNavbarLogged setLoggedState={props.setLoggedState} />

      }
    </>
  )
}

export default Navbar