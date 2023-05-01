import { EuiCard, EuiFlexGroup, EuiImage,EuiFlexItem } from '@elastic/eui'
import React from 'react';
import Header from '../components/Header';
import meeting1 from '../assets/meeting1.png';
import meeting2 from '../assets/meeting2.png';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateMeeting = () => {
    useAuth();
    const navigate = useNavigate();
  return (
    <div style={{display: 'flex',height:'100vh',flexDirection:'column'}}>
      <Header/>
      <EuiFlexGroup justifyContent='center' alignItems='center' style={{margin: '5vh 10vw'}}>
        <EuiFlexItem>
            <EuiCard
                icon={<EuiImage size='100%' alt='icon' src={meeting1}/>}
                title={`Create 1 on 1 meeting`}
                description="Create a personal single person meeting."
                onClick={() => navigate("/create1on1")}
                paddingSize="xl"
            />
        </EuiFlexItem>
        <EuiFlexItem>
            <EuiCard
                icon={<EuiImage size='100%' alt='icon' src={meeting2}/>}
                title={`Create video conference`}
                description="Invite person to the meeting."
                onClick={() => navigate("/createvideoconference")}
                paddingSize="xl"
            />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting
