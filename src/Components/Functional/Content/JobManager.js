import { store } from "../../../index";
import { Button, message, Popconfirm } from "antd";
import { CloseOutlined } from "@ant-design/icons";
export function AmIEditingThisJob(shiftToCheck) {
  const state = store.getState();
  return (
    typeof state.unsavedJobs.calls.find((call) =>
      call.call.shifts.find((shift) => shift.job_id === shiftToCheck.job_id)
    ) !== "undefined"
  );
}

export function HowManyORTCSs(shiftToCheck) {
  return shiftToCheck.shift_has_needs.filter(
    (need) =>
      need.has_skills.filter(
        (skill) =>
          parseInt(skill.skill_id) ===
          parseInt(process.env.REACT_APP_OR_TCS_SKILL_ID)
      ).length > 0
  ).length;
}

export function HowManyWATCSs(shiftToCheck) {
  return shiftToCheck.shift_has_needs.filter(
    (need) =>
      need.has_skills.filter(
        (skill) =>
          parseInt(skill.skill_id) ===
          parseInt(process.env.REACT_APP_WA_TCS_SKILL_ID)
      ).length > 0
  ).length;
}

export function HowManyFlaggers(shiftToCheck) {
  return shiftToCheck.shift_has_needs.filter(
    (need) =>
      need.has_skills.filter(
        (skill) =>
          parseInt(skill.skill_id) ===
          parseInt(process.env.REACT_APP_Flagger_SKILL_ID)
      ).length > 0
  ).length;
}

export function HowManyDrivers(shiftToCheck) {
  return shiftToCheck.shift_has_needs.filter(
    (need) =>
      need.has_skills.filter(
        (skill) =>
          parseInt(skill.skill_id) ===
          parseInt(process.env.REACT_APP_Driver_SKILL_ID)
      ).length > 0
  ).length;
}

export function HowManyStandardTrucks(shiftToCheck) {
  return (
    shiftToCheck.shift_has_equipment_needs.filter(
      (need) =>
        parseInt(need.subtype_id) ===
        parseInt(process.env.REACT_APP_Standard_Truck_SUBTYPE_ID)
    ).length > 0
  );
}

export function modalFooter(props) {
  return [
    <Button
      key="back"
      disabled={
        AmIEditingThisJob(props.selectedShift) ===
        props.AmIEditingThisJob
      }
      onClick={() => props.setSelectedShift(false)}
    >
      Save
    </Button>,
    <Popconfirm
      title="Are you sure you want to discard your changes?"
      onConfirm={() => {
        props.setSelectedShift(false);
      }}
      okText="Yes"
      cancelText="No"
      disabled={
        AmIEditingThisJob(props.selectedShift) ===
        props.AmIEditingThisJob
      }
    >
      <Button
        key="cancel"
        disabled={
          AmIEditingThisJob(props.selectedShift) ===
          props.AmIEditingThisJob
        }
        danger
      >
        Cancel
      </Button>
    </Popconfirm>,
    <Button
      key="submit"
      type="primary"
      onClick={() => message.success("Shift Updated")}
      disabled={
        AmIEditingThisJob(props.selectedShift) ===
        props.AmIEditingThisJob
      }
    >
      Complete
    </Button>,
  ];
}

export function closeIcon(props) {
  return (
    <Popconfirm
      title="Are you sure you want to discard your changes?"
      onConfirm={() => () => props.setSelectedShift(false)}
      okText="Yes"
      cancelText="No"
      disabled={
        AmIEditingThisJob(props.selectedShift) === props.AmIEditingThisJob
      }
    >
      <CloseOutlined />
    </Popconfirm>
  );
}
