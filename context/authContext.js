import { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseSetup';
import { onAuthStateChanged } from 'firebase/auth';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { currentUser } = auth;
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
    });
  }, []);

  return (
    <AuthContext.Provider value={[authenticated, currentUser]}>
      {children}
    </AuthContext.Provider>
  );
};
