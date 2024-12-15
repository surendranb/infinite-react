import React, { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);

    useEffect(() => {
         const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if(user){
                 try {
                      const docRef = doc(db, "users", user.uid);
                        const docSnap = await getDoc(docRef);

                       if(docSnap.exists()) {
                         setUserDetails(docSnap.data());
                        } else {
                           setUserDetails({ name: "", apiKey: "" });
                       }

                  }
                    catch (e) {
                         console.error("Error getting user settings", e);
                        setUserDetails(null);
                     }
            } else {
                 setUserDetails(null);
             }
             setLoading(false);
        });

        return unsubscribe;
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, loading, userDetails, setUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
};