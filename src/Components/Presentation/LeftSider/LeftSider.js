import React, { useEffect } from "react";
import { Badge, Menu, Layout, Spin } from "antd";
import ContractorSearch from "./ContractorSearch";
import { connect } from "react-redux";
import { PhoneOutlined, PhoneTwoTone, SearchOutlined } from "@ant-design/icons";
import { AzureAD } from "react-aad-msal";
import { planningAuthProvider } from "../../../Utils/msauth";
import { OpenCall } from "../../../Utils/redux/actions/unsavedJobs";
function LeftSider(props) {
  useEffect(() => {
    props.unsavedJobsCalls.length === 1 &&
      props.OpenCall(props.unsavedJobsCalls.find((call) => true));
  }, [props.unsavedJobsCalls]);
  return (
    <Layout.Sider
      collapsible
      collapsed={props.collapse}
      onCollapse={props.setCollapse}
    >
      <AzureAD provider={planningAuthProvider} forceLogin={true}>
        {({ accountInfo }) => (
          <Menu style={{ height: "86vh" }}>
            <Menu.Item
              key="1"
              title={
                props.activeCall !== null &&
                props.unsavedJobsCalls.find(
                  (call) => call.id === props.activeCall
                )
                  ? props.unsavedJobsCalls.find(
                      (call) => call.id === props.activeCall
                    ).call.caller.children
                  : "Unsaved Jobs"
              }
              icon={
                <Badge
                  dot={
                    props.unsavedJobsCalls.filter(
                      (call) =>
                        call.dispatcher ===
                        accountInfo.account.accountIdentifier
                    ).length > 1
                  }
                  offset={[-10, 5]}
                >
                  {props.activeCall !== null ? (
                    <PhoneTwoTone spin />
                  ) : (
                    <PhoneOutlined />
                  )}
                </Badge>
              }
            >
              {props.collapse === false &&
                (props.activeCall !== null &&
                props.unsavedJobsCalls.find(
                  (call) => call.id === props.activeCall
                )
                  ? props.unsavedJobsCalls.find(
                      (call) => call.id === props.activeCall
                    ).call.caller.children
                  : (props.activeCall !== null ? <Spin /> : "Unsaved Jobs"))}
            </Menu.Item>
            <Menu.Item
              onClick={() => props.setCollapse(false)}
              key="2"
              title="Search"
              icon={<SearchOutlined />}
            >
              <ContractorSearch
                collapse={props.collapse}
                setCollapse={props.setCollapse}
              />
            </Menu.Item>
          </Menu>
        )}
      </AzureAD>
    </Layout.Sider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    OpenCall: (call) => dispatch(OpenCall(call)),
  };
};

const mapStateToProps = (state) => {
  return {
    unsavedJobsCalls: state.unsavedJobs.calls,
    activeCall: state.unsavedJobs.activeCall,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LeftSider);
