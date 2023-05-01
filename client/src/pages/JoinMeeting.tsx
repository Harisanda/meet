import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { onAuthStateChanged } from 'firebase/auth';
import { getDocs, query, where } from 'firebase/firestore';
import moment from 'moment';
import React , {useEffect, useState} from 'react'
import { useNavigate ,useParams} from 'react-router-dom';
import { firebaseAuth, meetingsRef } from '../utils/FirebaseConfig';
import { generateMeetingId } from '../utils/GenerateMeetingId';

const JoinMeeting = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isAllowed, setIsAllowed] = useState(false);
    const [user, setUser] = useState<any>(undefined);
    const [userLoaded, setUserLoaded] = useState(false);
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser){
            setUser(currentUser);
        }
        setUserLoaded(true);
    });
    useEffect(() =>{
        const getMeetingData = async () => {
            if (params.id && userLoaded) {
              const firestoreQuery = query(
                meetingsRef,
                where("meetingId", "==", params.id)
              );
              const fetchedMeetings = await getDocs(firestoreQuery);
      
              if (fetchedMeetings.docs.length) {
                const meeting = fetchedMeetings.docs[0].data();
                const isCreator = meeting.createdBy === user.uid;
                if (meeting.meetingType === "1-on-1") {
                  if (meeting.invitedUsers[0] === user.uid || isCreator) {
                    if (meeting.meetingDate === moment().format("L")) {
                      setIsAllowed(true);
                    } else if (
                      moment(meeting.meetingDate).isBefore(moment().format("L"))
                    ) {
                      navigate(user ? "/" : "/login");
                    } else if (moment(meeting.meetingDate).isAfter()) {
                      navigate(user ? "/" : "/login");
                    }
                  } else navigate(user ? "/" : "/login");
                } else if (meeting.meetingType === "video-conference") {
                  const index = meeting.invitedUsers.findIndex(
                    (invitedUser: string) => invitedUser === user.uid
                  );
                  if (index !== -1 || isCreator) {
                    if (meeting.meetingDate === moment().format("L")) {
                      setIsAllowed(true);
                    } else if (
                      moment(meeting.meetingDate).isBefore(moment().format("L"))
                    ) {
                      navigate(user ? "/" : "/login");
                    }
                  } else {
                    navigate(user ? "/" : "/login");
                  }
                } else {
                  setIsAllowed(true);
                }
              }
            }
          };
          getMeetingData();
    },[userLoaded]);

    const appId = 846723234;
    const serverSecret = "3bdffedd4d908b2c5d867809e3a09cc3";

    const myMeeting = async (element:any) => {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            params.id as string,
            user && user.uid ? user.uid: generateMeetingId(),
            user && user.displayName ? user.displayName : generateMeetingId()
        );
        console.log(kitToken);

        const zp = ZegoUIKitPrebuilt.create(kitToken);

        zp.joinRoom({
            container: element,
            maxUsers: 50,
            sharedLinks: [
                {
                name: "Personal link",
                url: window.location.origin,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.VideoConference,
            },
            showTurnOffRemoteCameraButton: true,
            showTurnOffRemoteMicrophoneButton: true,
            showRemoveUserButton: true
        });
    }

  return (
    <div 
        className='myCallContainer' 
        ref={myMeeting} 
        style={{width: "100%", height: "100vh"}}
    >
    </div>
  )
}

export default JoinMeeting