import { EuiFieldNumber, EuiFormRow } from '@elastic/eui'
import React from 'react'

const MeetingMaxUserField = ({value,setValue}:{
    value:number,setValue:React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <EuiFormRow label="Maximum people">
        <EuiFieldNumber placeholder='max people' min={1} max={15} value={value} 
        onChange={(e)=>setValue(+e.target.value)}/>
    </EuiFormRow>
  )
}

export default MeetingMaxUserField
