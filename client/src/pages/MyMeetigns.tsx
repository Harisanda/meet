import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth';
import { useAppSelector } from '../app/hooks';
import { meetingsRef } from '../utils/FirebaseConfig';
import { MeetingType } from '../utils/Types'
import {query,where,getDocs} from 'firebase/firestore'
import Header from '../components/Header';
import { EuiBasicTable, EuiCopy, EuiFlexGroup,EuiButton, EuiFlexItem, EuiPanel } from '@elastic/eui';



const MyMeetigns = () => {
    useAuth();
    const [meetings, setMeetings] =  useState<any>([]);
    const user = useAppSelector((meet)=> meet.auth.userInfo);
    useEffect(() => {
        if(user){
            const getMyMeetings = async () => {
                const firestoreQuery = query(meetingsRef, where("createdBy","==",user.uid));
                const fetchMeetings = await getDocs(firestoreQuery);
                if(fetchMeetings.docs.length) {
                  const myMeetings:Array<MeetingType> = [];
                  fetchMeetings.forEach((meeting) => {
                    myMeetings.push({
                      docId: meeting.id,
                      ...(meeting.data() as MeetingType),
                    });
                  });
                  setMeetings(myMeetings);
                }
            }
            getMyMeetings();
        }
    },[user]);
    const columns = [
      {
        field:"meetingName",
        name:"Meeting Name"
      },
      {
        field:"meetingType",
        name:"Type"
      },
      {
        field:"",
        name:"Status"
      },
      {
        field:"",
        name:"Edit"
      },
      {
        field:"meetingId",
        name:"Copy Link",
        render:(meetingId:string) => {
          return <EuiCopy textToCopy=''>
            {(copy:any) => (
              <EuiButton onClick={copy}
                aria-label="Meeting-copy"
              >Copy</EuiButton>
            )}
          </EuiCopy>
        }
      }
    ];
  return (
    <div style={{display: 'flex', height:'100vh' ,flexDirection:'column'}}>
      <Header/>
      <EuiFlexGroup justifyContent='center'  style={{margin:'1rem'}}> 
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns}/>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default MyMeetigns
