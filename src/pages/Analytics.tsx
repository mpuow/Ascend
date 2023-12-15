import AnalyticsDisplay from '../components/AnalyticsDisplay'
import Unauthorised from './Unauthorised'

// Analytics page with components, routing depending on loggedState
const Analytics = (props:any) => {
  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <AnalyticsDisplay />}
    </div>
  )
}

export default Analytics