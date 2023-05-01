import React from "react";
import {EuiProvider} from "@elastic/eui";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateMeeting from "./pages/CreateMeeting";
import OneOnOneMeeting from "./pages/OneOnOneMeeting";
import VideoConference from "./pages/VideoConference";
import MyMeetigns from "./pages/MyMeetigns";
import JoinMeeting from "./pages/JoinMeeting";

const App = () => {

  const overrides = {
    colors: {
      LIGHT: {primary: "#0b5cff"},
      DARK: {primary: "#0b5cff"},
    },
  };

  return (
    <EuiProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create" element={<CreateMeeting/>}/>
          <Route path="/create1on1" element={<OneOnOneMeeting/>}/>
          <Route path="/createvideoconference" element={<VideoConference/>}/>
          <Route path="/meetigns" element={<MyMeetigns/>} />
          <Route path="/join/:id" element={<JoinMeeting/>} />
          <Route path="/" element={<Dashboard/>}/>
          <Route path="*" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </EuiProvider>
  );
}

export default App;
