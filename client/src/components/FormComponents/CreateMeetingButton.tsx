import { EuiButton, EuiFlexGroup, EuiFlexItem } from '@elastic/eui'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CreateMeetingButton = ({createmeeting}:
    {createmeeting:() => void}) => {
    const navigate = useNavigate();
  return (
    <EuiFlexGroup>
        <EuiFlexItem grow={false}>
            <EuiButton color='danger' fill onClick={() =>navigate("/")}>Cancel</EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
            <EuiButton color='primary' fill onClick={createmeeting}>Submit</EuiButton>
        </EuiFlexItem>
    </EuiFlexGroup>
  )
}

export default CreateMeetingButton
