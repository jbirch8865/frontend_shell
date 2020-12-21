import React, {useState, useEffect} from "react";
import { Modal, Row, Col } from "antd";
import { connect } from "react-redux";
import * as JobManagementFunctions from "../../Functional/Content/JobManager";
import EditJobCalendar from "./EditJobCalendar";
function JobManager(props) {
  const AmIEditingThisJob = false //Use this while testing if there are no shifts being edited and you change this to true then it will reverse the logic of what we want edited shifts to do
  return (
    <Modal
      visible={props.selectedShift}
      width={"90vw"}
      destroyOnClose={true}
      closeIcon={JobManagementFunctions.closeIcon({
        selectedShift: props.selectedShift,
        setSelectedShift: props.setSelectedShift,
        AmIEditingThisJob
      })}
      onCancel={() =>
        JobManagementFunctions.AmIEditingThisJob(props.selectedShift) ===
          AmIEditingThisJob && props.setSelectedShift(false)
      }
      footer={JobManagementFunctions.modalFooter({
        selectedShift: props.selectedShift,
        setSelectedShift: props.setSelectedShift,
        AmIEditingThisJob
      })}
      style={{ top: 20 }}
    >
      <Row>
        <Col span={10}>
          <EditJobCalendar
            selectedShift={props.selectedShift}
            setSelectedShift={props.setSelectedShift}
          />
        </Col>
      </Row>
    </Modal>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    activeCall: state.unsavedJobs.activeCall,
    unsavedJobsCalls: state.unsavedJobs.calls,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobManager);
