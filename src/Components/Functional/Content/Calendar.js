import React from "react";
import { Tooltip, Menu, Dropdown } from "antd";
// import { store } from "../../../index";
import moment from "moment";
import {
  HowManyORTCSs,
  HowManyWATCSs,
  HowManyDrivers,
  HowManyFlaggers,
} from "../../Functional/Content/JobManager";

export function eventContent(
  event,
  selectedShift,
  setSelectedShift,
  datesInRange
) {
  const dateInRange = datesInRange.find(
    (date) => date.date.getTime() === event.start.getTime()
  );
  if (event.extendedProps.shift === null) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: dateInRange.selectedForAction
            ? "rgba(255,255,0,.3)"
            : "rgba(255,255,255,1)",
        }}
      >
        <span style={{ float: "right" }}>{event.start.getUTCDate()}</span>
      </div>
    );
  } else {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          backgroundColor:
            dateInRange.selectedForAction ? "rgba(255,255,0,.3)" : (selectedShift === null ? "rgba(255,0,0,0)" : (selectedShift.shift_id === event.extendedProps.shift.shift_id
              ? "rgba(255,255,0,.3)"
              : "rgba(255,0,0,0)")),
        }}
      >
        <span style={{ float: "right" }}>{event.start.getUTCDate()}</span>
        <Tooltip
          title={
            <>
              {event.extendedProps.shift.shift_has_address.name}
              <br />
              {event.extendedProps.shift.shift_has_address.street_address}
              <br />
              {event.extendedProps.shift.shift_has_address.city +
                ", " +
                event.extendedProps.shift.shift_has_address.state +
                " " +
                event.extendedProps.shift.shift_has_address.zip}
            </>
          }
        >
          <img
            alt="location"
            height="15px"
            width="15px"
            src="https://dhpublicicons.s3-us-west-2.amazonaws.com/google_maps.png"
          />
          -
          {(event.extendedProps.shift.shift_has_address.name !== ""
            ? event.extendedProps.shift.shift_has_address.name +
              " " +
              event.extendedProps.shift.shift_has_address.street_address
            : event.extendedProps.shift.shift_has_address.street_address
          ).substring(0, 8)}
        </Tooltip>
        <br />
        {HowManyORTCSs(event.extendedProps.shift) > 0 && (
          <>
            <Tooltip title={HowManyORTCSs(event.extendedProps.shift)}>
              <img
                alt="ORTCS"
                height="15px"
                width="15px"
                src="https://dhpublicicons.s3-us-west-2.amazonaws.com/OR_TCS.png"
              />
              ={HowManyORTCSs(event.extendedProps.shift)}
            </Tooltip>
            <br />
          </>
        )}
        {HowManyWATCSs(event.extendedProps.shift) > 0 && (
          <>
            <Tooltip title={HowManyWATCSs(event.extendedProps.shift)}>
              <img
                alt="WATCS"
                height="15px"
                width="15px"
                src="https://dhpublicicons.s3-us-west-2.amazonaws.com/WA_TCS.png"
              />
              ={HowManyWATCSs(event.extendedProps.shift)}
            </Tooltip>
            <br />
          </>
        )}
        {HowManyDrivers(event.extendedProps.shift) > 0 && (
          <>
            {" "}
            <Tooltip title={HowManyDrivers(event.extendedProps.shift)}>
              <img
                alt="Driver"
                height="15px"
                width="15px"
                src="https://dhpublicicons.s3-us-west-2.amazonaws.com/Driver_Flagger2.png"
              />
              =
              {HowManyDrivers(event.extendedProps.shift) -
                HowManyORTCSs(event.extendedProps.shift) -
                HowManyWATCSs(event.extendedProps.shift)}
            </Tooltip>
            <br />
          </>
        )}
        {HowManyFlaggers(event.extendedProps.shift) > 0 && (
          <>
            <Tooltip title={HowManyFlaggers(event.extendedProps.shift)}>
              <img
                alt="Flagger"
                height="15px"
                width="15px"
                src="https://dhpublicicons.s3-us-west-2.amazonaws.com/Flagger_cert.png"
              />
              =
              {HowManyFlaggers(event.extendedProps.shift) -
                HowManyDrivers(event.extendedProps.shift)}
            </Tooltip>
            <br />
          </>
        )}
        <p>
          {moment(event.extendedProps.shift.go_time, "HH:mm:ss").format(
            "h:mm a"
          )}
        </p>
      </div>
    );
  }
}

export function contextMenu(children, optionsEnabled) {
  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        disabled={!optionsEnabled.add}
      >
        Add/New
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="2"
        disabled={!optionsEnabled.copy}
      >
        Copy
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="3"
        disabled={!optionsEnabled.edit}
      >
        Edit
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="4"
        disabled={!optionsEnabled.paste}
      >
        Paste/Overwrite
      </Menu.Item>
      <Menu.Item
        key="5"
        disabled={!optionsEnabled.paste}
      >
        Paste New Only
      </Menu.Item>
      <Menu.Item
        key="6"
        disabled={!optionsEnabled.delete}
      >
        Delete
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["contextMenu"]}>
      {children}
    </Dropdown>
  );
}

export function renderEventContext(
  event,
  shiftFocus,
  setShiftFocus,
  setDatesInRange,
  datesInRange
) {
  let possibleActions = event.extendedProps.shift !== null ? {delete:true,copy:true,paste:false,add:false,edit:true} : {delete:false,copy:false,paste:false,add:true,edit:false}

  return contextMenu(
    eventContent(
      event,
      shiftFocus,
      setShiftFocus,
      setDatesInRange,
      datesInRange
    ),
    possibleActions
  );
}
