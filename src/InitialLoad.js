import React from 'react'
import { useEffect } from 'react';
import {connect} from 'react-redux'
import * as bookingActions from "./Utils/redux/actions/unsavedJobs"
function InitialLoad(props)
{
    useEffect(() => {
      props.getUnsavedJobsCalls()
    },[])
    return <></>
}

const mapDispatchToProps = dispatch => {
    return {
      getUnsavedJobsCalls: () => dispatch(bookingActions.GetCalls())
    }
  }
  const mapStateToProps = (state) => {
    return {
      unsavedJobsCalls: state.unsavedJobs.calls
    }
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(InitialLoad);
        