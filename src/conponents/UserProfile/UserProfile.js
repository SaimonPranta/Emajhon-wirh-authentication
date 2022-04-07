import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseConfig from '../Log In/firebaseConfig';
import './UserProfile.css';

const UserProfile = () => {
    const [userInfo ,serUserInfo] = useState({
        email: '',
        name: '',
        gender: '',
        dateOfBirth: '',
        photo: '',
    })
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(() => {
        const newUser = {
            email: '',
            name: '',
            gender: '',
            dateOfBirth: '',
            photo: ''

        }
        onAuthStateChanged(auth, (user) => {
            if (user){
                newUser.email = user.email
                newUser.name = user.displayName
                newUser.gender = user.gender
                newUser.dateOfBirth = user.dateOfBirth
                newUser.photo = user.photoURL
                console.log(newUser)
                serUserInfo(newUser)
            } else {
            }
        });
    }, [])
    return (
        <div className='user-profile'>
            {
                userInfo.photo && <img src={userInfo.photo} alt="Image" />
            }
            {
                userInfo.name && <h5>{userInfo.name}</h5>
            }
            {
                userInfo.gender && <p>Gender: {userInfo.gender}</p>
            }
            {
                userInfo.dateOfBirth && <p> Date of birth: {userInfo.dateOfBirth}</p>
            }
            {
                userInfo.email && <p> Email: {userInfo.email}</p>
            }
            
        </div>
    );
};

export default UserProfile;