import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { message } from "antd";
import "./Style.css";
import * as actions from "../../../Utils/redux/actions/booking_apicall";
// import interactionPlugin from "@fullcalendar/interaction";
// import TaskListModal from "../Tasklist/TaskListModal"
// import EditJobModal from "../Tasklist/EditJobModal"
// import moment from "moment"
// import { Tooltip, message, Badge, Button } from "antd"
// import "../../Style.css"
import { EndCall } from "../../../Utils/redux/actions/unsavedJobs";
const MainCalendar = (props) => {
  const [shiftsFound, setShiftsFound] = useState([]);
  const [searchParams, setSearchParams] = useState({
    start_date: "2020-01-01",
    end_date: "2020-01-01",
  });
  // const [hovering, setHovering] = useState(false)
  // const [popoverShowing, setPopoverShowing] = useState(false)
  // const [editJob, setEditJob] = useState({
  //   selectedShift: props.selectedTask,
  //   message: "",
  //   shifts: [],
  //   contact: false,
  //   dateRange: {
  //     blockedDates: [],
  //     workingDates: [],
  //     datesToAdd: [],
  //     datesToRemove: [],
  //     datesToEdit: [],
  //     datesSelected: []
  //   },
  // })
  // let copyStartDate = props.dateRange.startDate.clone()
  // let copyEndDate = props.dateRange.endDate.clone()
  // const info = () => {
  //   if (props.loading) {
  //     message.loading({ content: "Loading ...", key: "updatable" })
  //   } else {
  //     message.destroy("updatable")
  //   }
  // }
  // const selectContact = () => {
  //   message.error("You need to first specify the contact.")
  // }
  useEffect(() => {
      props.searchShifts(searchParams, setShiftsFound);
}, [props.activeCall, searchParams]);
  return (
    <FullCalendar
      events={shiftsFound.map((shift) => {
        return {
          id: shift.shift_id,
          title: shift.shift_has_address.street_address,
          start: shift.date,
          shift: shift
        };
      })}
      timeZone="America/Los_Angeles"
      height="90vh"
      datesSet={(dateInfo) =>
        setSearchParams({
          ...searchParams,
          start_date: dateInfo.start.toISOString(),
          end_date: dateInfo.end.toISOString(),
        })
      }
      dayMaxEventRows={3}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      eventClick={({event}) => props.setSelectedShift(event.extendedProps.shift)}
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchShifts: (searchParams, setShiftsFound) =>
      actions.getShifts(searchParams, setShiftsFound),
    endCall: (call) => dispatch(EndCall(call)),
  };
};

const mapStateToProps = (state) => {
  return {
    activeCall: state.unsavedJobs.activeCall,
    unsavedJobsCalls: state.unsavedJobs.calls,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainCalendar);
