import { combineReducers } from "redux"
import trainingStepsReducer from "./reactTour"
import loadingReducer from "./loading"
import unsavedJobsReducer from './unsavedJobs';
const rootReducer = combineReducers({
  trainingSteps: trainingStepsReducer,
  somethingIsLoading: loadingReducer,
  unsavedJobs: unsavedJobsReducer,
})

export default rootReducer
