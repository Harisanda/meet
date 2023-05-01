import { EuiButton, EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from '@elastic/eui';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../app/hooks';
import { firebaseAuth } from '../utils/FirebaseConfig';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = useAppSelector((meet) =>  meet.auth.userInfo);
    const [breadCrumbs,setBreadCrumbs] = useState([{text: "Dashboard"}]);
    const [isResponsive,setIsResponsive] = useState(false);
    const dispatch = useDispatch();
    const logout = () => {
      signOut(firebaseAuth);
    }
    const section = [
      {
        items:[
          <Link to="/">
            <EuiText>
              <h2 style={{padding: '0 1vw'}}>
                <EuiTextColor color="#0b5cff">Meet</EuiTextColor>
              </h2>
            </EuiText>
          </Link>
        ],
      },
      {
        items: [
          <>
            { username ? (
              <EuiText>
                <h3>
                  <EuiTextColor color="black">Hello, </EuiTextColor>
                  <EuiTextColor color="#0b5cff">{username.name}</EuiTextColor>
                </h3>
              </EuiText>
            ): null
            }
          </>
        ]
      },
      {
        items: [
          <EuiFlexGroup justifyContent='center' alignItems='center' direction='row' style={{gap: "2vw"}}>
            <EuiFlexItem grow={false} style={{flexBasis:'fil-content'}}>
              <EuiButton fill onClick={logout}>Logout</EuiButton>
              {/* <EuiButtonIcon onClick={logout} iconType="lock"/> */}
              {/* onClick={logout} iconType="lock" display='fill' size='s' aria-label='logout-button' */}
            </EuiFlexItem>
          </EuiFlexGroup>
        ]
      }
    ];
    const responsiveSection = [{
      items:[
        <Link to="/">
          <EuiText>
            <h2 style={{padding: '0 1vw'}}>
              <EuiTextColor color="#0b5cff">Meet</EuiTextColor>
            </h2>
          </EuiText>
        </Link>
      ]
    }];

    useEffect(() => {
      if(window.innerWidth<400) setIsResponsive(true);
    },[])
  return (
    <>
      {/* ilay header tsy mety mandeha de  toute façon ho atao @ bootstrap iny */}
      <EuiHeader style={{minHeight: '8vh'}} theme="dark" sections={isResponsive? responsiveSection : section}/> 
      <EuiHeader style={{minHeight: '8vh'}} sections={[{breadcrumbs: breadCrumbs}]} />
    </>
  )
}

export default Header
