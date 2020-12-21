import * as Actions from "./actionConstants";
import { Bookingapi } from "../../api";

function endCall() {
  return {
    type: Actions.END_CALL
  };
}
function updateCall(call) {
  return {
    type: Actions.UPDATE_CALL,
    call,
  };
}
export function OpenCall(call) {
  return {
    type: Actions.OPEN_CALL,
    call,
  };
}

export function getCalls(calls) {
  return {
    type: Actions.GET_CALLS,
    calls,
  };
}

export function StartCall(call) {
  return (dispatch) => {
    Bookingapi.post("/calls", { call: JSON.stringify(call) }).then((response) =>
      dispatch(GetCalls()).then(() => dispatch(updateCall(response.data.call)))
    );
  };
}

export function UpdateCall(call) {
  return (dispatch) => {
    Bookingapi.put("/calls/" + call.id, { call: JSON.stringify(call) }).then(
      (response) => {
        dispatch(GetCalls());
      }
    );
  };
}

export function EndCall(call) {
  return (dispatch) => {
    dispatch(endCall());
    Bookingapi.delete("/calls/" + call.id).then((response) =>
      dispatch(GetCalls())
    );
  };
}

export const GetCalls = () => (dispatch) =>
  new Promise((resolve, reject) =>
    Bookingapi.get("/calls").then((response) => {
      dispatch(
        getCalls(
          response.data.calls.map((call) => {
            return { ...call, call: JSON.parse(call.call) };
          })
        )
      );
      resolve();
    })
  );