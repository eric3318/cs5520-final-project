import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseSetup';
import { onAuthStateChanged } from 'firebase/auth';
import { COLLECTIONS, readFromDB } from '../firebase/firestoreHelper';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { currentUser } = auth;
  const [authenticated, setAuthenticated] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
  }, []);

  useEffect(() => {
    if (!authenticated) {
      setUserInfo(null);
      return;
    }

    (async () => {
      try {
        const data = await readFromDB(COLLECTIONS.USER, currentUser.uid);
        setUserInfo(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [authenticated]);

  return (
    <AuthContext.Provider value={{ authenticated, currentUser, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
