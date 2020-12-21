import * as Actions from "../actions/actionConstants";
import initialState from "../initialState";
export default function unsavedJobsReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.OPEN_CALL:
      return {
        ...state,
        activeCall: action.call.id,
      };
    case Actions.GET_CALLS:
      return {
        ...state,
        calls: action.calls,
      };
    case Actions.END_CALL:
      return {
        ...state,
        activeCall: null,
      };
    case Actions.UPDATE_CALL:
      return {
        ...state,
        activeCall: action.call.id,
      };
    default:
      return state;
  }
}
