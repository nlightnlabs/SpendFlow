import React, {useState, useEffect, useMemo, useCallback} from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import './styles/main.css'
import RecordDetails from './RecordDetails.js';
import { getTable } from './apis/axios.js';
import {toProperCase} from './functions/formatValue.js'
import { UTCToLocalTime } from './functions/time.js';
import Draggable from 'react-draggable';

const Table = (props) => {

    const userData = props.userData;
    const tableName = props.tableName || ""
    const formName = props.formName || ""
    const appData = props.appData
    const [tableData, setTableData] = useState([]);
    const [fields, setFields] = useState([])
    const [recordId, setSelectedRecordId] = useState(0)
    const [showRecordDetails, setShowRecordDetails] = useState(false)
    

    const getTableData = async (req, res)=>{
      const response = await getTable(tableName)

      let fieldList = []
        if(response.data.length>0){
          Object.keys(response.data[0]).map((field,index)=>{
            fieldList.push({headerName: toProperCase(field.replaceAll("_"," ")), field: field, filter: true})
        })
          setFields(fieldList)
        }

        setTableData(response.data.sort((a, b) => {
          return  b.id-a.id;
        }));

      }
      
  useEffect(()=>{
    getTableData()
  },[])


    const onCellClicked = (e) => {
      setSelectedRecordId(e.data.id)
      setShowRecordDetails(true)
    }

    const recordDetailsModalStyle={
      position: "fixed", 
      top: '50%',
      left: '50%',
      height: "80vh", 
      width: "80vw", 
      translate: "-50% -50%",
      zIndex: 999,
      cursor: "grab",
       overflowY:"auto", 
       overflowX: "hidden"
    }
  
  return (
      <div className="ag-theme-quartz animate__animated animate__fadeIn animate__duration-0.5s" style={{fontSize:"12px", height: "100%", width: "100%" }}>
        <AgGridReact 
          rowData={tableData} 
          columnDefs={fields} 
          onCellClicked={onCellClicked}
        />
        {
          showRecordDetails && 
          <Draggable>
          <div 
            className="d-flex flex-column bg-light border border-3 shadow rounded-3" 
            style={recordDetailsModalStyle}>
              <RecordDetails
                tableName={tableName}
                recordId={recordId}
                tableData={tableData}
                formName={formName}
                userData = {userData}
                appData = {appData}
                setShowRecordDetails = {setShowRecordDetails}
                refreshTable = {setTableData}
                updateParentStates = {[getTableData]}
              />
          </div>
          </Draggable>
        }          
    </div>
  )
}

export default Table