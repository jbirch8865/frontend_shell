import React, {useState} from "react";
import { Layout } from "antd";
import MainCalendar from './MainCalendar';
import JobManager from './JobManager';
export default function Content(props) {
  const [selectedShift,setSelectedShift] = useState(false)
  return (
    <Layout.Content onClick={() => props.setCollapse(true)}>
      <div style={{ height: "86vh" }}>
        <MainCalendar 
          setSelectedShift={setSelectedShift}
        />
        <JobManager 
          selectedShift={selectedShift}
          setSelectedShift={setSelectedShift}
        />
      </div>
    </Layout.Content>
  );
}
