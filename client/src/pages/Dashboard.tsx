import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiIcon, EuiImage } from '@elastic/eui';
import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { useAppSelector } from '../app/hooks';
import useAuth from '../hooks/useAuth';
import dashboard1 from '../assets/dashboard1.png';
import dashboard2 from '../assets/dashboard2.png';
import dashboard3 from '../assets/dashboard3.png';
import Header from '../components/Header';

const Dashboard = () => {
  useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div style={{display: 'flex',height:'100vh',flexDirection:'column'}}>
        <Header/>
        <EuiFlexGroup justifyContent='center' alignItems='center' style={{margin: '5vh 10vw'}}>
          <EuiFlexItem>
            <EuiCard icon={<EuiImage size='5rem' alt='icon' src={dashboard1}/>}
              title={`Create Meeting`}
              description="create a new meeting and invite people. "
              onClick={() => navigate("/create")}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard icon={<EuiImage size='100%' alt='icon' src={dashboard2}/>}
              title={`My meetings`}
              description="View your created meetigns."
              onClick={() => navigate("/meetigns")}
              paddingSize="xl"
            />
          </EuiFlexItem>

          <EuiFlexItem>
            <EuiCard icon={<EuiImage size='5rem' alt='icon' src={dashboard3}/>}
              title={`Meetings`}
              description="View the meetings that you are invited to. "
              onClick={() => navigate("/mymeetign")}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  )
}

export default Dashboard
