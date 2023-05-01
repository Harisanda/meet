import { EuiFlexGroup , EuiForm, EuiSpacer} from '@elastic/eui'
import { addDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import CreateMeetingButton from '../components/FormComponents/CreateMeetingButton'
import MeetingField from '../components/FormComponents/MeetingField'
import MeetingMaxUserField from '../components/FormComponents/MeetingMaxUserField'
import Header from '../components/Header'
import useAuth from '../hooks/useAuth'
import { meetingsRef } from '../utils/FirebaseConfig'
import { generateMeetingId } from '../utils/GenerateMeetingId'

const VideoConference = () => {
    useAuth();
    const navigate = useNavigate();
    const username = useAppSelector((meet) =>  meet.auth.userInfo);
    const [meetingName,setMeetingName] = useState("");
    const [size,setSize] = useState(1);

    const createMeeting = async () => {
        if(username){
            const meetingId = generateMeetingId();
            await addDoc(meetingsRef, {
                createdBy: username.uid,
                meetingId,
                meetingName,
                meetingType: "any-one-can-join",
                maxUsers: 100,
                status: true,
            });
        }
        navigate("/");
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
            <MeetingMaxUserField value={size} setValue={setSize}/>
            {/* <EuiSpacer /> */}
            <CreateMeetingButton createmeeting={createMeeting}/>
        </EuiForm>
      </EuiFlexGroup>
    </div>
  )
}

export default VideoConference

