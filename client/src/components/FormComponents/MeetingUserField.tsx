import { EuiComboBox, EuiFormRow } from '@elastic/eui'
import React from 'react'

const MeetingUserField = ({label,options,onChange,selectedOptions,isClearable,placeholder,singleSelection}:
    {
        label:string,
        options:any,
        onChange:any,
        selectedOptions:any,
        isClearable:boolean,
        placeholder:string,
        singleSelection:any
    }) => {
  return (
    <>
        <EuiComboBox
            options={options} 
            onChange={onChange} 
            selectedOptions={selectedOptions} 
            singleSelection={singleSelection}  
            placeholder={placeholder}
            isClearable={isClearable}
        />
        <p>Hello</p>
    </>
  )
}

export default MeetingUserField