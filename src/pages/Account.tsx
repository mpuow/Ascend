import AccountDisplay from "../components/AccountDisplay"
import Unauthorised from "./Unauthorised"

// Account page with components, routing depending on loggedState
const Account = (props: any) => {

  return (
    <div>
      {!props.loggedState ? <Unauthorised /> : <AccountDisplay />}

    </div>
  )
}

export default Account