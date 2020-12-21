import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import "./Style.css";
import { getShifts } from "../../../Utils/redux/actions/booking_apicall";
import { renderEventContext } from "../../Functional/Content/Calendar";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
const EditJobCalendar = (props) => {
  const searchParams = {
    job_id: props.selectedShift ? props.selectedShift.job_id : false,
  }
  const [datesInRange, setDatesInRange] = useState([]);
  const [shiftsFound, setShiftsFound] = useState([]);
  const [shiftFocus, setShiftFocus] = useState(props.selectedShift);
  const calendarRef = useRef();
  
  const datesSet = (dateInfo) =>
  {
    let startDate = dateInfo.start;
    let daysToInclude = [];
    while (startDate <= dateInfo.end) {
      const newDate = new Date(startDate);
      daysToInclude = [
        ...daysToInclude,
        {
          date: newDate,
          selectedForAction: false,
          shifts: shiftsFound.filter(
            (shift) =>
              shift.date ===
              newDate.getUTCFullYear() +
                "-" +
                ("0" + (newDate.getUTCMonth() + 1)).slice(-2) +
                "-" +
                ("0" + newDate.getUTCDate()).slice(-2)
          ),
        },
      ];
      startDate.setDate(startDate.getDate() + 1);
    }
    setDatesInRange(daysToInclude);
  }

  const customButtons = {
    earliestShift: {
      text: <DoubleLeftOutlined />,
      click: () =>
        calendarRef.current
          .getApi()
          .gotoDate(
            new Date(
              shiftsFound.sort(
                (a, b) => new Date(a.date) - new Date(b.date)
              )[0].date
            )
          ),
    },
    latestShift: {
      text: <DoubleRightOutlined />,
      click: () =>
        calendarRef.current
          .getApi()
          .gotoDate(
            new Date(
              new Date(
                shiftsFound.sort(
                  (a, b) => new Date(b.date) - new Date(a.date)
                )[0].date
              )
            )
          ),
    },
  }

  const events = datesInRange
  .map((date) => {
    if (date.shifts.length > 0) {
      return date.shifts.map((shift) => {
        return {
          id: shift.shift_id,
          start: shift.date,
          shift,
          display: "background",
        };
      });
    } else {
      return {
        id: date.date.getUTCDate(),
        start:
          date.date.getUTCFullYear() +
          "-" +
          ("0" + (date.date.getUTCMonth() + 1)).slice(-2) +
          "-" +
          ("0" + date.date.getUTCDate()).slice(-2),
        shift: null,
        display: "background",
      };
    }
  })
  .flat()

  const eventClick = (eventClickInfo) => {
    const dateInRange = datesInRange.find(
      (date) => date.date.getTime() === eventClickInfo.event.start.getTime()
    );
    if(eventClickInfo.jsEvent.ctrlKey)
    {
      setShiftFocus(null)
      setDatesInRange(
        datesInRange.map((date) =>
          date.date.getTime() === dateInRange.date.getTime()
            ? { ...date, selectedForAction: !date.selectedForAction }
            : date
        )
      )      
    }else
    {
      setShiftFocus(eventClickInfo.event.extendedProps.shift)
      setDatesInRange(
        datesInRange.map((date) =>
          date.date.getTime() === dateInRange.date.getTime()
            ? { ...date, selectedForAction: !date.selectedForAction }
            : { ...date, selectedForAction: false }
        )
      )
    }
  }
  useEffect(() => {
    shiftsFound.length === 0 &&
      props.searchShifts(searchParams, setShiftsFound);
    shiftsFound.length > 0 &&
      setDatesInRange(
        datesInRange.map((date) => {
          if (
            shiftsFound.find(
              (shift) =>
                shift.date ===
                date.date.getUTCFullYear() +
                  "-" +
                  ("0" + (date.date.getUTCMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + date.date.getUTCDate()).slice(-2)
            )
          ) {
            return {
              date: date.date,
              selectedForAction: false,
              shifts: shiftsFound.filter(
                (shift) =>
                  shift.date ===
                  date.date.getUTCFullYear() +
                    "-" +
                    ("0" + (date.date.getUTCMonth() + 1)).slice(-2) +
                    "-" +
                    ("0" + date.date.getUTCDate()).slice(-2)
              ),
            };
          } else {
            return date;
          }
        })
      );
  }, [shiftsFound]);
  return (
    <FullCalendar
      ref={calendarRef}
      datesSet={(dateInfo) => datesSet(dateInfo)}
      headerToolbar={{
        left: "title",
        center: "today",
        right: "earliestShift,prev,next,latestShift",
      }}
      customButtons={customButtons}
      events={events}
      eventContent={({ event }) =>
        renderEventContext(event, shiftFocus, setShiftFocus,datesInRange)
      }
      eventClick={(eventClickInfo) => eventClick(eventClickInfo)}
      dayCellContent={<></>}
      timeZone="America/Los_Angeles"
      aspectRatio={1}
      dayMaxEventRows={1}
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
    />
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchShifts: (searchParams, setShiftsFound) =>
      getShifts(searchParams, setShiftsFound),
  };
};

const mapStateToProps = (state) => {
  return {
    activeCall: state.unsavedJobs.activeCall,
    unsavedJobsCalls: state.unsavedJobs.calls,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditJobCalendar);
