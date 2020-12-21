import { Bookingapi } from "../../api";
import { store } from "../../../index";

export function getShifts(searchParams,getShiftsCallback) {
  const state = store.getState();
  const activeCall = state.unsavedJobs.calls.find(
    (call) => call.id === state.unsavedJobs.activeCall
  );
  if(typeof activeCall === "undefined")
  {
    return
  }
  searchParams = {
    ...searchParams,
    contact: activeCall.call.caller.key,
  };
  return Bookingapi.get("/shifts", {
    params: searchParams,
  }).then(results => getShiftsCallback(results.data.shifts));
}
