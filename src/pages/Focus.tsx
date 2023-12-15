import FocusMode from '../components/FocusMode'
import Unauthorised from './Unauthorised'

// Focus page with components, routing depending on loggedState
const Focus = (props: any) => {

  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <FocusMode />}
    </div>
  )
}

export default Focus