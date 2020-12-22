import * as Actions from "./actionConstants";
import { Bookingapi } from "../../api";
export function addTrainingStep(step) {
  return {
    type: Actions.ADD_TRAINING_STEP,
    step,
  };
}

export function removeTrainingStep(step) {
  return {
    type: Actions.REMOVE_TRAINING_STEP,
    step,
  };
}
export function removeAllTrainingSteps() {
  return {
    type: Actions.REMOVE_ALL_TRAINING_STEPS,
  };
}

export function gotoTrainingStep(step) {
  return {
    type: Actions.GOTO_TRAINING_STEP,
    currentStep: step,
  };
}
export function hideTrainingTour() {
  return {
    type: Actions.HIDE_TRAINING_TOUR,
  };
}

function setUserCompletedTrainings(completedtrainings) {
  return {
    type: Actions.GET_USER_COMPLETED_TRAININGS,
    completedtrainings,
  };
}

function setRegisteredTrainings(registeredtrainings) {
  return {
    type: Actions.GET_REGISTERED_TRAININGS,
    registeredtrainings,
  };
}
export function GetUserCompletedTrainings() {
  return (dispatch) => {
    Bookingapi.get("/reacttour/usercompletedtrainingsteps")
      .then(function (response) {
        dispatch(setUserCompletedTrainings(response.data.usercompletedtrainingsteps))
        return true
      })
      .catch(function (error) {
        dispatch(removeAllTrainingSteps())
        return false
      });
  };
}

export function getRegisteredTrainings() {
  return (dispatch) => {
    Bookingapi.get("/reacttour/trainingsteps")
      .then(function (response) {
        dispatch(setRegisteredTrainings(response.data.trainingsteps))
        return true
      })
      .catch(function (error) {
        dispatch(removeAllTrainingSteps())
        return false
      });
  };
}

export function CompleteUserTraining(name) {
  return dispatch => {
<<<<<<< HEAD
    Bookingapi.post("/reacttour/usercompletedtrainingsteps",{name}).then(function (response) {
=======
    if(true){return false}
    Planningapi.post("/reacttour/usercompletedtrainingsteps",{name}).then(function (response) {
>>>>>>> 02ba122234ef699c538763779b35bea108ea3c9a
    }).catch(function (error) {});
  }
}
