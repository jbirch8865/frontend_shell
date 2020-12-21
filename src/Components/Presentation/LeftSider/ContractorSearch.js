import React, { useState, useEffect, useRef } from "react";
import { Select, Spin } from "antd";
import { connect } from "react-redux";
import * as actions from "../../../Utils/redux/actions/unsavedJobs";
import * as cdm_actions from "../../../Utils/redux/actions/cdm_apicall";
function ContractorSearch(props) {
  const [inputContractorValue, setInputContractorValue] = useState(null);
  const [contractorSearchOptions, setContractorSearchOptions] = useState(
    <Select.Option key={0}>
      <Spin />
    </Select.Option>
  );
  const searchForContractorMicroDelay = useRef();

  useEffect(() => {
    setContractorSearchOptions([]);
    clearTimeout(searchForContractorMicroDelay.current);
    if (
      inputContractorValue !== null &&
      inputContractorValue.children.length < 35
    ) {
      setContractorSearchOptions(
        <Select.Option key={0}>
          <Spin />
        </Select.Option>
      );
      searchForContractorMicroDelay.current = setTimeout(() => {
        cdm_actions
          .searchForContractor(inputContractorValue.children)
          .then((response) =>
            setContractorSearchOptions(
              response.data.contacts.data.map((contact) => (
                <Select.Option key={contact.person_id}>
                  {contact.first_name +
                    " " +
                    contact.last_name +
                    " - " +
                    contact.belongs_to_company.customer.customer_name}
                </Select.Option>
              ))
            )
          );
        props.unsavedJobsCalls.map(
          (call) => call.call.shifts.length === 0 && props.EndCall(call)
        );
      }, 750);
    }
    return () => clearTimeout(searchForContractorMicroDelay.current);
  }, [inputContractorValue]);
  return (
    props.collapse === false && (
      <Select
        showSearch={true}
        allowClear={true}
        autoFocus={true}
        onClear={() =>
          setInputContractorValue(null)
        }
        value={
          inputContractorValue !== null ? inputContractorValue.children : null
        }
        dropdownMatchSelectWidth={250}
        placeholder="contractor search ..."
        defaultActiveFirstOption={false}
        style={{ width: "85%" }}
        showArrow={false}
        filterOption={false}
        onSearch={(value) => {
          value === ""
            ? setInputContractorValue(null)
            : setInputContractorValue({
                value: null,
                children: value,
                key: null,
              });
        }}
        onChange={(number, option) => {
          typeof option !== "undefined" &&
            (setInputContractorValue(option) ||
              props.StartCall({ caller: option, shifts: [] }));
        }}
        notFoundContent={null}
      >
        {contractorSearchOptions}
      </Select>
    )
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    StartCall: (call) => dispatch(actions.StartCall(call)),
    OpenCall: (call) => dispatch(actions.OpenCall(call)),
    EndCall: (call) => dispatch(actions.EndCall(call)),
  };
};

const mapStateToProps = (state) => {
  return {
    unsavedJobsCalls: state.unsavedJobs.calls,
    activeCall: state.unsavedJobs.activeCall,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ContractorSearch);
