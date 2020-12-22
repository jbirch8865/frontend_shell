import React, {useEffect} from 'react'
import {Tooltip,Dropdown} from "antd"
import {SyncOutlined,InsertRowRightOutlined} from "@ant-design/icons"
import {CDMapi} from "../../../Utils/api"
export default function TagHeader(props)
{
    const loadWorkforce = () => {
        props.setLoadingWorkforce(true);
        CDMapi.get("/employees").then((json) => {
          const returnData = json.data.employees.map((person) => {
            return { ...person, key: person.person_id };
          });
          props.setData(returnData);
          props.setFilteredData(returnData);
          props.setLoadingWorkforce(false);
        });
      };
      useEffect(() => loadWorkforce(),[])

    return(
        <>
            <Tooltip title="Refresh Table">
                <SyncOutlined onClick={() => loadWorkforce()} />
            </Tooltip>
            {/* <Tooltip title="Column Chooser">
                <Dropdown overlay={props.columnChooserMenu} trigger={["click"]}>
                    <InsertRowRightOutlined />
                </Dropdown>
            </Tooltip> */}
        </>
    )
} 