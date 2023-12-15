import Hero from '../components/Hero'
import MountainPage from '../components/MountainPage'

// Home page with components, routing depending on loggedState. MountainPage (ie. the Progress page) is the default route once logged in
const Home = (props: any) => {

  return (
    <>
      <div>
        {!props.loggedState ? <Hero setLoggedState={props.setLoggedState} /> : <MountainPage />}
      </div>
    </>
  )
}

export default Home