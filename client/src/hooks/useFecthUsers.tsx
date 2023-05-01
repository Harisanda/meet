import React,{useEffect, useState} from "react";
import { useAppSelector } from "../app/hooks";
import { userRef } from "../utils/FirebaseConfig";
import {getDocs, query,where} from "firebase/firestore";
import { UserType } from "../utils/Types";

export default function useFecthUsers () {
    const [users,setUsers] = useState<Array<UserType>>([]);
    const user = useAppSelector((meet) => meet.auth.userInfo);

    //console.log(user);

    useEffect(() =>{
        if(user) {
            const getUsers = async () => {
                const firestoreQuery = query(userRef, where("uid", "!=", user.uid));
                const data = await getDocs(firestoreQuery);
                const firebaseUsers: Array<UserType> = [];
                data.forEach((usr) =>{
                    const userData = usr.data() as UserType;
                    firebaseUsers.push({
                        ...userData,
                        label: userData.name,
                    });
                });
                setUsers(firebaseUsers);
            }
            getUsers();
        }
    },[user]);
    return [users];
}