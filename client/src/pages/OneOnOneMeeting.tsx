import { EuiFlexGroup , EuiForm, EuiSpacer} from '@elastic/eui'
import React, { useState } from 'react'
import CreateMeetingButton from '../components/FormComponents/CreateMeetingButton'
import MeetingField from '../components/FormComponents/MeetingField'
import MeetingUserField from '../components/FormComponents/MeetingUserField'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import useFecthUsers from '../hooks/useFecthUsers'

const OneOnOneMeeting = () => {
    useAuth();
    const [users] = useFecthUsers();
    //console.log(users);
    const [meetingName,setMeetingName] = useState("");
    const [selectedUser,setSelectedUser] = useState([]);

    const onUserChange = (selecteOptions:any) => {
      setSelectedUser(selecteOptions);
      console.log('yo')
    }

    const createMeeting = () => {
      
    } 

  return (
    <div style={{display: 'flex',height:'100vh',flexDirection:'column'}}>
      <Header/>
      <EuiFlexGroup justifyContent='center' alignItems='center' >
        <EuiForm>
            <MeetingField
                label="MeetingName"
                placeholder="Meeting Name"
                value= {meetingName}
                setMeetingName={setMeetingName}
            />
            <MeetingUserField 
                label="Invite user"
                options={users} 
                onChange={onUserChange}
                selectedOptions={selectedUser}
                singleSelection={{asPlainText: true}}
                isClearable={false}
                placeholder="Select a user"    
            />
            {/* <EuiSpacer /> */}
            <CreateMeetingButton createmeeting={createMeeting}/>
        </EuiForm>
      </EuiFlexGroup>
    </div>
  )
}

export default OneOnOneMeeting
