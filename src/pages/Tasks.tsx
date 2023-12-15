import TaskList from '../components/TaskList'
import Unauthorised from './Unauthorised'

// Task page with components, routing depending on loggedState
const Tasks = (props: any) => {

  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <TaskList />}
    </div>
  )
}

export default Tasks