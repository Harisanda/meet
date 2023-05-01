import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { where,query, getDocs, addDoc } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import {setUser} from '../app/slices/AuthSlice';
import animation from "../assets/animation.gif";
import logo from "../assets/logo.png";
import { firebaseAuth,userRef } from '../utils/FirebaseConfig';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //vérifier si l'utilisateur est deja connecté
  onAuthStateChanged(firebaseAuth, (currentUser) =>{
    if(currentUser) navigate("/")
  })


  //connexion avec google
  const login = async () => {
    const provider = new GoogleAuthProvider();

    //collection des informations à transmettre dans la base de donnée

    const {
      user: {displayName,email,uid},
    } = await signInWithPopup(firebaseAuth,provider);
    if(email) {
      const firestoreQuery = query(userRef, where("uid","==",uid));
      const fetchUser = await getDocs(firestoreQuery);
      if (fetchUser.docs.length == 0) {
        await addDoc(userRef,{
          uid,
          name: displayName,
          email,
        });
      }
    }
    dispatch(setUser({uid,name: displayName,email}))
    navigate('/');
  }

  return (
      <EuiProvider colorMode='dark'>
        <EuiFlexGroup alignItems='center' justifyContent='center' style={{width:'100vw',height:'100vh'}}>
          <EuiFlexItem grow={false}>
            <EuiPanel paddingSize='xl'>
              <EuiFlexGroup justifyContent='center' alignItems='center'>
                <EuiFlexItem>
                  <EuiImage src={animation} alt='animation'/>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiImage src={logo} alt='logo' size='230px'/>
                  <EuiSpacer size='xs'/>
                  <EuiText textAlign='center' grow={false}>
                    <h3>
                      <EuiTextColor>One platform to </EuiTextColor>
                      <EuiTextColor color="#0b5cff">connect</EuiTextColor>
                    </h3>
                  </EuiText>
                  <EuiSpacer size='l'/>
                  <EuiButton fill onClick={login}>Login with Google</EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiProvider>
  )
}

export default Login 